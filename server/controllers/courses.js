const { BadRequestError, NotFoundError } = require("../errors/");
const Course = require("../models/course");
const { StatusCodes } = require("http-status-codes");

const getAllCourses = async (req, res) => {
  const courses = await Course.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ courses });
};

const getCourse = async (req, res) => {
  const {
    user: { userID },
    params: { id: courseId },
  } = req;

  const course = await Course.findOne({
    _id: courseId,
    createdBy: userID,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(StatusCodes.OK).json({ course });
};

const createCourse = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json(course);
};

const updateCourse = async (req, res) => {
  const {
    body: { title, description, teacher, hours, type },
    user: { userID },
    params: { id: courseId },
  } = req;

  if (
    title === "" ||
    description === "" ||
    teacher === "" ||
    hours === "" ||
    type === ""
  ) {
    throw new BadRequestError(
      "Title, description, teacher, hours, type fields cannot be empty"
    );
  }

  const course = await Course.findByIdAndUpdate(
    {
      _id: courseId,
      createdBy: userID,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(StatusCodes.OK).json({ course });
};

const deleteCourse = async (req, res) => {
  const {
    user: { userID },
    params: { id: courseId },
  } = req;

  const course = await Course.findByIdAndRemove({
    _id: courseId,
    createdBy: userID,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(StatusCodes.OK).json({ course });
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
