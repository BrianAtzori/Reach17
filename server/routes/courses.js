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
} = require("../controllers/courses");

// ---------- Routes ----------

coursesRouter.route("/").post(createCourse).get(getAllCourses);
coursesRouter.route("/:id").get(getCourse).delete(deleteCourse).patch(updateCourse);

// ---------- Exports ----------
module.exports = coursesRouter;
