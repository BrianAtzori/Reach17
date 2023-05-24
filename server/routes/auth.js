// ---------- Express + Router Setup ----------
const express = require("express");
const authRouter = express.Router();

// ---------- Auth controllers imports and setup  ----------
const { loginStudent, registerStudent } = require("../controllers/auth");

authRouter.post("/login", loginStudent);
authRouter.post('/register', registerStudent)

// ---------- Exports ----------

module.exports = authRouter;
