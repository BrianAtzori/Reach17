const { BadRequestError, NotFoundError } = require("../errors/");
const Course = require("../models/course");
const University = require("../models/user-university");
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

const associateCourse = async (req, res) => {
  let result = "";

  const {
    params: { id: courseId },
  } = req;

  if (!courseId) {
    throw new BadRequestError("No course provided");
  }

  const requestUniversity = req.body.universityId;

  const university = await University.findById(requestUniversity);

  if (!university) {
    throw new NotFoundError("University not found");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  for (let i = 0; i < university.courses.length; i++) {
    if (university.courses[i].toString().includes("PENDING")) {
      const idToCheck = university.courses[i].toString().split(":");
      if (idToCheck[1] === courseId) {
        result =
          "Richiesta di associazione già effettuata, aspetta che la richiesta venga accettata o contatta direttamente l'università.";
        break;
      }
    } else {
      const idToCheck = university.courses[i].toString();
      if (idToCheck === courseId) {
        result = "Richiesta di associazione già completata.";
        break;
      }
    }
  }

  if (result === "") {
    university.courses.push("PENDING:" + courseId);
    result =
      "Richiesta di associazione completata, attendi l'accettazione da parte dell'Università.";

    await University.findByIdAndUpdate(university, university);
  }

  res.status(StatusCodes.OK).json(result);
};

const confirmAssociation = async (req, res) => {
  let result = "";

  const courseToConfirm = req.body.courseId;

  if (!courseToConfirm) {
    throw new BadRequestError();
  }

  const universityId = req.user.userID;

  if (!universityId) {
    throw new BadRequestError();
  }

  const university = await University.findById(universityId);

  if (!university) {
    throw new NotFoundError();
  }

  for (let i = 0; i < university.courses.length; i++) {
    if (university.courses[i].toString().includes("PENDING")) {
      let course = university.courses[i].split(":");

      if (course[1] === courseToConfirm) {
        university.courses[i] = course[1];

        result = "Richiesta di associazione completata!";

        await University.findByIdAndUpdate(university, university);
      }
    }
  }

  if (result === "") {
    result =
      "Il corso indicato non è stato trovato tra le tue richieste in sospeso.";
  }

  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  associateCourse,
  confirmAssociation,
};
