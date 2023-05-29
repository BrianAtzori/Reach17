// ---------- Express + Router Setup ----------
const express = require("express");
const authRouter = express.Router();

// ---------- Auth controllers imports and setup  ----------
const { loginStudent, registerStudent, loginTeacher, registerTeacher } = require("../controllers/auth");

// ---------- STUDENT  ----------
authRouter.post("/login", loginStudent);
authRouter.post('/register', registerStudent)

// ---------- TEACHER  ----------
authRouter.post("/login/teacher", loginTeacher);
authRouter.post("/register/teacher",registerTeacher);

// ---------- Exports ----------

module.exports = authRouter;
