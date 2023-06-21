const { BadRequestError, NotFoundError } = require("../errors/");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher");
const { StatusCodes } = require("http-status-codes");

const getAllUniversities = async (req, res) => {
  const universities = await University.find({});

  if (!universities) {
    throw new NotFoundError("No university found");
  }

  res.status(StatusCodes.OK).json({ universities });
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find({});

  if (!teachers) {
    throw new NotFoundError("No teacher found");
  }

  res.status(StatusCodes.OK).json({ teachers });
};

const getTeacher = async (req, res) => {
  const {
    params: { id: teacherID },
  } = req;

  const teacher = await Teacher.find({ _id: teacherID });

  if (!teacher) {
    throw new NotFoundError("Teacher not found");
  }

  res.status(StatusCodes.OK).json({ teacher });
};

const getUniversity = async (req, res) => {
  const {
    params: { id: universityID },
  } = req;

  const university = await University.find({ _id: universityID });

  if (!university) {
    throw new NotFoundError("University not found");
  }

  res.status(StatusCodes.OK).json({ university });
};

module.exports = {
  getAllUniversities,
  getAllTeachers,
  getTeacher,
  getUniversity
};
