import "dotenv/config";
import express from 'express'
import mongoose from "mongoose";

import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import cors from "cors";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRotes from "./Kambaz/Enrollments/routes.js";

import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import QuizAttemptRoutes from "./Kambaz/QuizAttempts/routes.js";
import QuestionRoutes from "./Kambaz/Questions/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
})); 
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      // domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
  

app.use(express.json());

QuizAttemptRoutes(app)
QuestionRoutes(app)
QuizzesRoutes(app);

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRotes(app);
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)
