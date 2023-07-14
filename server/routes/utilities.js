// ---------- Express + Router Setup ----------
const express = require("express");
const utilitiesRouter = express.Router();

// ---------- Controllers Imports ----------
const {
  getAllUniversities,
  getAllTeachers,
  getTeacher,
  getUniversity,
  getAllAssociationRequests,
  getAllPendingRequests,
  getAllStudents
} = require("../controllers/utilities");

// ---------- Routes ----------
utilitiesRouter.route("/universities").get(getAllUniversities);
utilitiesRouter.route("/teachers").get(getAllTeachers);
utilitiesRouter.route("/teachers/:id").get(getTeacher);
utilitiesRouter.route("/universities/:id").get(getUniversity);
utilitiesRouter.route("/university/students").get(getAllStudents);
utilitiesRouter.route("/university/pending-requests").get(getAllAssociationRequests);
utilitiesRouter.route("/teacher/pending-requests").get(getAllPendingRequests);


// ---------- Exports ----------
module.exports = {
  utilitiesRouter,
};
