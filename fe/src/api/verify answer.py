from fastapi import FastAPI, Request
from pydantic import BaseModel
import dashscope
from dashscope import Generation
import json
import uvicorn
import sys

# Set your DashScope API key
dashscope.api_key = "sk-7dd51965d3bd46cba9c3565a7b928e15"
dashscope.base_http_api_url = "https://dashscope-intl.aliyuncs.com/api/v1"

app = FastAPI()

# Enable CORS if your frontend is on a different domain
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentInput(BaseModel):
    student_name: str
    student_class: str
    student_id: str
    system_question: str
    system_answer: str
    student_answer: str

SYSTEM_MESSAGE = """You are an intelligent education assistant designed to verify students' answers and generate personalized study plans.

Your tasks:
1. Compare the student's answer with the correct answer (provided by the system).
2. Give a score between 0 to 100 based on the relevance, completeness, and accuracy of the student's answer.
3. Identify which topic(s) or concept(s) the student is weak in based on their answer.
4. Recommend a personalized study plan based on the student's weak points.

Only output a JSON object with the following structure:
{
  "score": <number from 0 to 100>,
  "feedback": "<short sentence>",
  "weak_points": [<list of strings>],
  "study_plan": [<list of strings>]
}
Do not include any extra explanation or formatting.
"""

def build_prompt(data: StudentInput) -> str:
    return f"""Student Name: {data.student_name}
Student Class: {data.student_class}
Student ID: {data.student_id}
System Question: {data.system_question}
System Answer: {data.system_answer}
Student Answer: {data.student_answer}
"""

def validate_json(response_text: str):
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return None

@app.post("/evaluate")
async def evaluate_student(data: StudentInput):
    user_prompt = build_prompt(data)

    # Retry logic
    for _ in range(2):
        try:
            # Use messages format instead of prompt/system
            messages = [
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": user_prompt}
            ]
            
            response = Generation.call(
                model="qwen-max",  # or "qwen-plus", "qwen-turbo" depending on your use case
                messages=messages,
                result_format="message"
            )
            
            # Access the content from the response structure
            reply = response.output.choices[0].message.content.strip()
            
            result = validate_json(reply)
            if result:
                return result
            else:
                retry_prompt = f"""Instructions:
You must output only a valid JSON object with the following structure:
{{
  "score": <number from 0 to 100>,
  "feedback": "<short sentence>",
  "weak_points": [<list of strings>],
  "study_plan": [<list of strings>]
}}

Previous Response:
--------------
{reply}
--------------

The above was not valid JSON. Please try again, and only respond with JSON format as instructed.
"""
                # Update user message for retry
                messages = [
                    {"role": "system", "content": SYSTEM_MESSAGE},
                    {"role": "user", "content": user_prompt},
                    {"role": "assistant", "content": reply},
                    {"role": "user", "content": retry_prompt}
                ]
        except Exception as e:
            return {"error": f"Qwen API error: {str(e)}"}

    return {"error": "Failed to produce valid JSON response after retries."}

if __name__ == "__main__":
    # Get port from command line arguments or use default
    port = 8001
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}. Using default port 8001.")
    
    print(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
