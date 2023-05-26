// ---------- Imports  ----------
const Student = require("../models/user-student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// ---------- STUDENT  ----------
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(
      "Please, provide an email and a password to authenticate"
    );
  }

  const student = await Student.findOne({ email });

  if (!student) {
    throw new UnauthenticatedError("Invalid Email");
  }

  const isPasswordCorrect = await student.pwdCheck(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = student.JWTGeneration();

  res.status(StatusCodes.OK).json({
    account: student.email,
    studentCode: student.studentCode,
    token,
  });
};

const registerStudent = async (req, res) => {
  console.log(req.body);
  const newStudent = await Student.create({ ...req.body });
  const token = newStudent.JWTGeneration();
  res.status(StatusCodes.CREATED).json({
    account: newStudent.email,
    studentCode: newStudent.studentCode,
    token,
  });
};

// ---------- Exports  ----------
module.exports = {
  loginStudent,
  registerStudent,
};
