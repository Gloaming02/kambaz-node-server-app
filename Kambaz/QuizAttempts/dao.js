import model from "./model.js";
import QuizModel  from "../Quizzes/model.js";

export function findAllQuizAttempts() {
  return model.find();
}

export function findAttemptsByQuizId(quizId) {
  return model.find({ quiz: quizId });
}

export function findAttemptsByUserId(userId) {
  return model.find({ user: userId });
}

export function findAttemptById(attemptId) {
  return model.findById(attemptId);
}

export function createQuizAttempt(attempt) {
  return model.create(attempt);
}

export function updateQuizAttempt(attemptId, updates) {
  return model.updateOne({ _id: attemptId }, { $set: updates });
}

export function deleteQuizAttempt(attemptId) {
  return model.deleteOne({ _id: attemptId });
}

export const findAttemptsByUserAndQuiz = (userId, quizId) => {
  return model.find({ user: userId, quiz: quizId }).sort({ attemptNumber: -1 });
};


export const canAttemptQuiz = async (userId, quizId) => {
  const quiz = await QuizModel.findById(quizId);
  if (!quiz) return 0;

  const maxAttempts = quiz.maxAttempts || 1;
  const attempts = await model.find({ user: userId, quiz: quizId });

  return Math.max(0, maxAttempts - attempts.length);
};
