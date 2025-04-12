import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String },
    quiz: { type: String, required: true },
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
    },
    title: String,
    points: Number,
    question: String,
    choices: [
      {
        text: String,
      },
    ],
    correctAnswer: mongoose.Schema.Types.Mixed,
    blanks: [String],
  },
  { collection: "questions" }
);

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
