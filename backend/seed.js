import mongoose from "mongoose";
import { Course } from "./server.js";
import data from "./courseData.json" assert { type: "json" };

await mongoose.connect(process.env.MONGO_URI);
await Course.deleteMany({});
await Course.insertMany(
  data.courses.map((c) => ({
    ...c,
    details: data.details[c.name],
  }))
);
console.log("seeded 🌱");
process.exit(0);
