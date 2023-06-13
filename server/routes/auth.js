// ---------- Express + Router Setup ----------
const express = require("express");
const authRouter = express.Router();

// ---------- Auth controllers imports and setup ----------
const { loginStudent, registerStudent, loginTeacher, registerTeacher, loginUniversity, registerUniversity } = require("../controllers/auth");

// ---------- STUDENT ----------
authRouter.post("/login", loginStudent);
authRouter.post('/register', registerStudent)

// ---------- TEACHER ----------
authRouter.post("/login/teacher", loginTeacher);
authRouter.post("/register/teacher",registerTeacher);

// ---------- UNIVERSITY ----------
authRouter.post("/login/university", loginUniversity);
authRouter.post("/register/university",registerUniversity);

// ---------- Exports ----------
module.exports = authRouter;
