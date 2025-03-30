import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/user/current", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  });

  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const enrollment = dao.enrollUserInCourse(user, course);
    res.json(enrollment);
  });

  app.delete("/api/enrollments", (req, res) => {
    const { user, course } = req.query;
    dao.unenrollUserFromCourse(user, course);
    res.sendStatus(200);
  });
}
