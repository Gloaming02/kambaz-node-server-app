import * as dao from "./dao.js";
import * as questionsDao from "./dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import { v4 as uuidv4 } from "uuid";

function QuestionRoutes(app) {
  app.get("/api/questions", async (req, res) => {
    const questions = await dao.findAllQuestions();
    res.json(questions);
  });

  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  app.get("/api/questions/:id", async (req, res) => {
    const question = await dao.findQuestionById(req.params.id);
    res.json(question);
  });

  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    console.log("createQuestion");
    const quizId = req.params.quizId;
    const questionData = { ...req.body, quiz: quizId, _id: uuidv4() };
    const newQuestion = await questionsDao.createQuestion(questionData);
    console.log(newQuestion);
    await quizzesDao.addQuestionToQuiz(quizId, newQuestion._id);

    res.json(newQuestion);
  });


  // app.put("/api/questions/:id", async (req, res) => {
  //   const status = await dao.updateQuestion(req.params.id, req.body);
  //   res.json(status);
  // });


  app.put("/api/questions/:id", async (req, res) => {
    const questionId = req.params.id;
    const newQuestion = req.body;
  
    const oldQuestion = await dao.findQuestionById(questionId);
    const oldPoints = oldQuestion?.points || 0;
    const newPoints = newQuestion?.points || 0;
    const diff = newPoints - oldPoints;
  
    const status = await dao.updateQuestion(questionId, newQuestion);
  
    if (diff !== 0) {
      await quizzesDao.incrementQuizPoints(oldQuestion.quiz, diff);
    }
  
    res.json(status);
  });

  
  app.delete("/api/questions/:id", async (req, res) => {
    const questionId = req.params.id;
  
    const question = await dao.findQuestionById(questionId);
    const quizId = question.quiz;
    await quizzesDao.removeQuestionFromQuiz(quizId, questionId);

    const status = await dao.deleteQuestion(questionId);
    
    res.json(status);
  });

  
}


export default QuestionRoutes;
