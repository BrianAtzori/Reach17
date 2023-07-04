// ---------- Express + Router Setup ----------
const express = require("express");
const coursesRouter = express.Router();

// ---------- Controllers Imports ----------
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  associateCourse,
  confirmAssociation,
} = require("../controllers/courses");

// ---------- Routes ----------

coursesRouter.route("/").post(createCourse).get(getAllCourses);
coursesRouter.route("/:id").get(getCourse).delete(deleteCourse).patch(updateCourse);
coursesRouter.route("/association/:id").patch(associateCourse)
coursesRouter.route("/university/confirm-association").patch(confirmAssociation)

// ---------- Exports ----------
module.exports = coursesRouter;
