import * as dao from "./dao.js"; 

export default function QuizAttemptRoutes(app) {
  app.get("/api/quizzes/:quizId/can-attempt/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const remainingAttempts = await dao.canAttemptQuiz(userId, quizId);
    res.json({ remainingAttempts });
  });
  
  

  app.get("/api/quiz-attempts", async (req, res) => {
    const attempts = await dao.findAllQuizAttempts();
    res.json(attempts);
  });

  app.get("/api/quiz-attempts/quiz/:quizId", async (req, res) => {
    const attempts = await dao.findAttemptsByQuizId(req.params.quizId);
    res.json(attempts);
  });

  app.get("/api/quiz-attempts/user/:userId", async (req, res) => {
    const attempts = await dao.findAttemptsByUserId(req.params.userId);
    res.json(attempts);
  });

  app.get("/api/quiz-attempts/:attemptId", async (req, res) => {
    const attempt = await dao.findAttemptById(req.params.attemptId);
    res.json(attempt);
  });

  app.post("/api/quiz-attempts", async (req, res) => {
    console.log("createQuizAttempt");
    const attempt = await dao.createQuizAttempt(req.body);
    console.log(attempt);

    res.json(attempt);
  });

  app.put("/api/quiz-attempts/:attemptId", async (req, res) => {
    const status = await dao.updateQuizAttempt(req.params.attemptId, req.body);
    res.json(status);
  });

  app.delete("/api/quiz-attempts/:attemptId", async (req, res) => {
    const status = await dao.deleteQuizAttempt(req.params.attemptId);
    res.json(status);
  });

  app.get("/api/attempts/user/:userId/quiz/:quizId", async (req, res) => {
    const { userId, quizId } = req.params;
    const attempts = await dao.findAttemptsByUserAndQuiz(userId, quizId);
    console.log(attempts);
    res.json(attempts);
  });

}


