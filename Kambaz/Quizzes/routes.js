// quizzes/routes.js
import * as dao from "./dao.js";

export default function QuizzesRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  });

  app.get("/api/quizzes/course/:courseId", async (req, res) => {
    const quizzes = await dao.findQuizzesForCourse(req.params.courseId);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
  });

  app.post("/api/quizzes/course/:courseId", async (req, res) => {
    const quiz = { ...req.body, course: req.params.courseId };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.updateQuiz(req.params.quizId, req.body);
    res.json(status);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.json(status);
  });
}
