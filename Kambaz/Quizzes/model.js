import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  course: String,
  createdBy: String,
  published: Boolean,
  points: { type: Number, default: 0 }, 
  quizType: String,
  assignmentGroup: String,
  shuffleAnswers: Boolean,
  timeLimit: Number,
  maxAttempts: Number,
  showCorrectAnswers: {
    type: String,
    enum: ["Immediately", "After Due Date", "Never"],
    default: "Never"
  } ,
  accessCode: String,
  oneQuestionAtATime: Boolean,
  webcamRequired: Boolean,
  lockQuestionsAfterAnswering: Boolean,
  availableDate: String,
  dueDate: String,
  untilDate: String,
  questions: [String],
}, { collection: "quizzes" });

export default mongoose.model("Quiz", quizSchema);