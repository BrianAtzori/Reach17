// ---------- Express + Router Setup ----------
const express = require("express");
const utilitiesRouter = express.Router();

// ---------- Controllers Imports ----------
const {
  getAllUniversities,
  getAllTeachers,
} = require("../controllers/utilities");

// ---------- Routes ----------
utilitiesRouter.route("/universities").get(getAllUniversities);
utilitiesRouter.route("/teachers").get(getAllTeachers);

// ---------- Exports ----------
module.exports = {
  utilitiesRouter,
};
