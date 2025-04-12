import model from "./model.js";
import QuestionModel from "../Questions/model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllQuizzes = () => model.find();
export const findQuizzesForCourse = (courseId) => model.find({ course: courseId });
export const findQuizById = (quizId) => model.findById(quizId);

export const createQuiz = (quiz) => {
  if (!quiz._id) {
    quiz._id = uuidv4();
  }
  return model.create(quiz);
};
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = async (quizId) => {

  const quiz = await model.findById(quizId);

  if (quiz?.questions && quiz.questions.length > 0) {

    await QuestionModel.deleteMany({ _id: { $in: quiz.questions } });
  }
  return model.deleteOne({ _id: quizId });
};

export const addQuestionToQuiz = async (quizId, questionId) => {
  const question = await QuestionModel.findById(questionId);
  const points = question?.points || 0;

  return model.updateOne(
    { _id: quizId },
    {
      $push: { questions: questionId },
      $inc: { points: points },
    }
  );
};

export const removeQuestionFromQuiz = async (quizId, questionId) => {
  const question = await QuestionModel.findById(questionId);
  const points = question?.points || 0;

  return model.updateOne(
    { _id: quizId },
    {
      $pull: { questions: questionId },
      $inc: { points: -points },
    }
  );
};

export const incrementQuizPoints = async (quizId, delta) => {
  return model.updateOne({ _id: quizId }, { $inc: { points: delta } });
};
