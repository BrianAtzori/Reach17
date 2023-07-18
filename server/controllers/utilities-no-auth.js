const { BadRequestError, NotFoundError } = require("../errors/");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher");
const { StatusCodes } = require("http-status-codes");

const getAllUniversitiesForStudents = async (req, res) => {
  const universities = await University.find({});

  if (!universities) {
    throw new NotFoundError("No university found");
  }

  res.status(StatusCodes.OK).json(universities);
};

module.exports = {
  getAllUniversitiesForStudents,
};
