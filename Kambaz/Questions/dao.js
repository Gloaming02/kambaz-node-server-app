import QuestionModel from "./model.js";

export const findAllQuestions = () => QuestionModel.find();
export const findQuestionById = (id) => QuestionModel.findById(id);
export const findQuestionsForQuiz = (quizId) => QuestionModel.find({ quiz: quizId });

export const createQuestion = (question) => QuestionModel.create(question);

export const updateQuestion = (id, question) => QuestionModel.updateOne({ _id: id }, { $set: question });
export const deleteQuestion = (id) => QuestionModel.deleteOne({ _id: id });
