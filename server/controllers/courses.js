const { BadRequestError, NotFoundError } = require("../errors/");
const Course = require("../models/course");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher");
const Student = require("../models/user-student");
const { StatusCodes } = require("http-status-codes");

const getAllCourses = async (req, res) => {
  const courses = [];

  const userID = req.user.userID;

  const university = await University.findById(userID);

  const teacher = await Teacher.findById(userID);

  const allCourses = await Course.find({});

  if (university) {
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].createdBy === userID) {
        courses.push(allCourses[i]);
        continue;
      }

      for (let x = 0; x < allCourses[i].universities.length; x++) {
        if (allCourses[i].universities[x] === userID) {
          courses.push(allCourses[i]);
          continue;
        }
      }
    }

    res.status(StatusCodes.OK).json(courses);
  } else if (teacher) {
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].createdBy === userID) {
        courses.push(allCourses[i]);
        continue;
      }

      if (allCourses[i].teacher === userID) {
        courses.push(allCourses[i]);
        continue;
      }
    }
    res.status(StatusCodes.OK).json(courses);
  }

  throw new NotFoundError("User not found");
};

const getAllUniversityCourses = async (req, res) => {
  const studentId = req.user.userID;

  if (!studentId) {
    throw new BadRequestError("No ID provided");
  }

  const studentData = await Student.findById(studentId);

  const courses = await Course.find({});

  const filteredCourses = courses.map((course) => {
    for (let i = 0; i < course.universities.length; i++) {
      if (course.universities[i] === studentData.university) {
        return course;
      }
    }
  });

  console.log(filteredCourses);

  res.status(StatusCodes.OK).json(filteredCourses);
};

const getCourse = async (req, res) => {
  const {
    user: { userID },
    params: { id: courseId },
  } = req;

  const course = await Course.findOne({
    _id: courseId,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(StatusCodes.OK).json(course);
};

const getCourseDetailsForStudents = async (req, res) => {
  const {
    user: { userID },
    params: { id: courseId },
  } = req;

  const course = await Course.findOne({
    _id: courseId,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(StatusCodes.OK).json(course);
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

  res.status(StatusCodes.OK).json(course);
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

  res.status(StatusCodes.OK).json(course);
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

  const courseToConfirmID = req.body.courseId;

  if (!courseToConfirmID) {
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

  const courseToUpdate = await Course.findById(courseToConfirmID);

  for (let i = 0; i < university.courses.length; i++) {
    if (university.courses[i].toString().includes("PENDING")) {
      let course = university.courses[i].split(":");

      if (course[1] === courseToConfirmID) {
        university.courses[i] = course[1];

        result = "Richiesta di associazione completata!";

        courseToUpdate.status = "Confermato";

        await Course.findByIdAndUpdate(courseToConfirmID, courseToUpdate);

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

const courseSignUp = async (req, res) => {
  let result = "";

  const courseID = req.body.courseId;

  if (!courseID) {
    throw new BadRequestError("No course provided!");
  }

  const studentID = req.user.userID;

  if (!studentID) {
    throw new BadRequestError("Something went wrong, try again!");
  }

  const selectedCourse = await Course.findById(courseID);

  if (!selectedCourse) {
    throw new BadRequestError("Course not found");
  }

  const checkIfAlreadySubscribed = selectedCourse.registrations.find(
    (registration) => registration == studentID
  );

  if (checkIfAlreadySubscribed) {
    result = "Hai già effettuato l'iscrizione a questo corso!";
  } else {
    selectedCourse.registrations.push(studentID);

    const modifiedCourse = await Course.findByIdAndUpdate(
      { _id: selectedCourse._id },
      selectedCourse,
      { runValidators: true }
    );

    result = "Iscrizione completata correttamente!";
  }

  res.status(StatusCodes.OK).json(result);
};

const getCourseRegistrations = async (req, res) => {
  const coursesRegistrations = [];

  const studentID = req.user.userID;

  if (!studentID) {
    throw new BadRequestError("Something went wrong, try again!");
  }

  const allCourses = await Course.find({});

  for (let i = 0; i < allCourses.length; i++) {
    const checkIfSubscribed = allCourses[i].registrations.find(
      (registration) => registration == studentID
    );

    if (checkIfSubscribed) {
      coursesRegistrations.push(allCourses[i]);
    }
  }

  res.status(StatusCodes.OK).json(coursesRegistrations);
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  associateCourse,
  confirmAssociation,
  getAllUniversityCourses,
  getCourseDetailsForStudents,
  courseSignUp,
  getCourseRegistrations,
};
