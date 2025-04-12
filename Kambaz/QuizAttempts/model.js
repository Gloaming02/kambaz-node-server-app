import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
  question: String,
  answer: mongoose.Schema.Types.Mixed,
  correct: Boolean,
});

const quizAttemptSchema = new mongoose.Schema({
  quiz: String,
  user: String,
  attemptNumber: Number,
  submittedAt: String,
  score: Number,
  answers: [answerSchema],
}, { collection: "quizAttempts" });

export default mongoose.model("QuizAttempt", quizAttemptSchema);
