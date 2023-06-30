// ---------- Express + Router Setup ----------
const express = require("express");
const noAuthUtilitiesRouter = express.Router();

// ---------- Controllers Imports ----------
const {
  getAllUniversitiesForStudents,
} = require("../controllers/utilities-no-auth");

// ---------- Routes ----------
noAuthUtilitiesRouter
  .route("/for-students/universities")
  .get(getAllUniversitiesForStudents);

// ---------- Exports ----------
module.exports = {
  noAuthUtilitiesRouter,
};
