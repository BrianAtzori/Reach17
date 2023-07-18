// ---------- Imports  ----------
const Student = require("../models/user-student");
const Teacher = require("../models/user-teacher");
const University = require("../models/user-university");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// ---------- STUDENT ----------
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
    id: student._id,
  });
};

const registerStudent = async (req, res) => {
  const newStudent = await Student.create({ ...req.body });
  const token = newStudent.JWTGeneration();
  res.status(StatusCodes.CREATED).json({
    account: newStudent.email,
    studentCode: newStudent.studentCode,
    token,
  });
};

// ---------- TEACHER ----------
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(
      "Please, provide an email and a password to authenticate"
    );
  }

  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    throw new UnauthenticatedError("Invalid Email");
  }

  const isPasswordCorrect = await teacher.pwdCheck(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = teacher.JWTGeneration();

  res.status(StatusCodes.OK).json({
    account: teacher.email,
    token,
    id: teacher._id,
  });
};

const registerTeacher = async (req, res) => {
  const newTeacher = await Teacher.create({ ...req.body });
  const token = newTeacher.JWTGeneration();
  res.status(StatusCodes.CREATED).json({
    account: newTeacher.email,
    token,
  });
};

// ---------- UNIVERSITY ----------
const loginUniversity = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(
      "Please, provide an email and a password to authenticate"
    );
  }

  const university = await University.findOne({ email });

  if (!university) {
    throw new UnauthenticatedError("Invalid Email");
  }

  const isPasswordCorrect = await university.pwdCheck(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = university.JWTGeneration();

  res.status(StatusCodes.OK).json({
    account: university.email,
    token,
    id: university._id,
  });
};

const registerUniversity = async (req, res) => {
  const newUniversity = await University.create({ ...req.body });
  const token = newUniversity.JWTGeneration();
  res.status(StatusCodes.CREATED).json({
    account: newUniversity.email,
    token,
  });
};

// ---------- Exports ----------
module.exports = {
  loginStudent,
  registerStudent,
  loginTeacher,
  registerTeacher,
  loginUniversity,
  registerUniversity,
};
