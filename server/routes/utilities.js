// ---------- Express + Router Setup ----------
const express = require("express");
const utilitiesRouter = express.Router();

// ---------- Controllers Imports ----------
const {
  getAllUniversities,
  getAllTeachers,
  getTeacher,
  getUniversity,
  getAllAssociationRequests
} = require("../controllers/utilities");

// ---------- Routes ----------
utilitiesRouter.route("/universities").get(getAllUniversities);
utilitiesRouter.route("/teachers").get(getAllTeachers);
utilitiesRouter.route("/teachers/:id").get(getTeacher);
utilitiesRouter.route("/universities/:id").get(getUniversity);
utilitiesRouter.route("/university/pending-requests").get(getAllAssociationRequests);

// ---------- Exports ----------
module.exports = {
  utilitiesRouter,
};
