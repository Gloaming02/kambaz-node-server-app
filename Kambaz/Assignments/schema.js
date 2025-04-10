import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" }, 
    module: String,
    available: String,  
    due: String,
    until: String,
    points: Number,
    description: String
  },
  { collection: "assignments" }
);

export default schema;
