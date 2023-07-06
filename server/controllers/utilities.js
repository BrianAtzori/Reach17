const { BadRequestError, NotFoundError } = require("../errors/");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher");
const Course = require("../models/course");
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

const getAllAssociationRequests = async (req, res) => {
  let filteredCourses = [];
  let pendingCourses = [];

  const university = await University.find({ _id: req.user.userID });

  if (!university) {
    throw new NotFoundError("University not found");
  }

  for (let i = 0; i < university[0].courses.length; i++) {
    if (university[0].courses[i].toString().includes("PENDING")) {
      let course = university[0].courses[i].split(":");
      filteredCourses.push(course[1]);
    }
  }

  for (let i = 0; i < filteredCourses.length; i++) {
    const pendingCourse = await Course.findById({ _id: filteredCourses[i] });
    console.log(pendingCourse)
    pendingCourses.push(pendingCourse);
  }

  res.status(StatusCodes.OK).json(pendingCourses);
};

module.exports = {
  getAllUniversities,
  getAllTeachers,
  getTeacher,
  getUniversity,
  getAllAssociationRequests,
};
