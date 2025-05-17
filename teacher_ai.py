import os
import dashscope
from dashscope import Generation
import re
import json
import PyPDF2

# Set your key here
DASHSCOPE_API_KEY = "sk-7dd51965d3bd46cba9c3565a7b928e15"
dashscope.base_http_api_url = "https://dashscope-intl.aliyuncs.com/api/v1"


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text


def get_ai_summary_from_text(pdf_path):
    # Usage
    pdf_text = extract_text_from_pdf(pdf_path)
    prompt_input = (
        "you are a experienced teaching assistant. the textbook of malaysia form 4 syllabus is the input. "
        "summarize the content and transalate to english for student to understand it better"
    )
    "do not include inclass activities and questions on the summary"

    messages = [
        {"role": "system", "content": prompt_input},
        {"role": "user", "content": pdf_text},
    ]
    response = Generation.call(
        api_key=DASHSCOPE_API_KEY,
        model="qwen-max",
        messages=messages,
    )
    return response.output.text


def generate_qa_for_student(txt_content, n=10):
    # prompt
    messages = [
        {"role": "system", "content": f"Remember the following text:{txt_content}"},
        {
            "role": "user",
            "content": f"Generate {n} questions, denoted as Q and answers, denoted as A based on the text above. Each Q&A should have with numberings",
        },
    ]
    response = dashscope.Generation.call(
        # If environment variable is not configured, replace the line below with: api_key="sk-xxx",
        api_key=DASHSCOPE_API_KEY,
        model="qwen-plus",
        messages=messages,
        result_format="message",
        # stream=True,
        # # Incremental streaming data
        # incremental_output=True,
    )
    answer = response.output.choices[0].message.content
    return answer


def convert_to_qa_json(text, json_path):
    # Manual parsing approach for the specific format
    qa_pairs = []

    # Get all the questions with their numbers
    q_pattern = r"\*\*Q(\d+):\*\*(.*?)(?=\*\*A\d+:\*\*)"
    questions = re.findall(q_pattern, text, re.DOTALL)

    # Get all the answers with their numbers
    a_pattern = r"\*\*A(\d+):\*\*(.*?)(?=\*\*Q\d+:\*\*|\Z)"
    answers = re.findall(a_pattern, text, re.DOTALL)

    # Create a dictionary of answers for easy lookup
    answer_dict = {num: text.strip() for num, text in answers}

    # Match questions with answers
    for q_num, q_text in questions:
        if q_num in answer_dict:
            qa_pairs.append({"question": q_text.strip(), "answer": answer_dict[q_num]})

    # Create the JSON output structure
    output = {"output": qa_pairs}

    # Write the JSON to file with proper indentation
    with open(json_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

    return output


pdf_pth = "./Buku Teks Sejarah T4 - Bab 1.pdf"
summary_txt = get_ai_summary_from_text(pdf_pth)
qa_txt = generate_qa_for_student(summary_txt, n=10)
output = convert_to_qa_json(qa_txt, "./demo.json")
