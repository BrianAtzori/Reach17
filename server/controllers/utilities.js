const { BadRequestError, NotFoundError } = require("../errors/");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher")
const { StatusCodes } = require("http-status-codes");

const getAllUniversities = async (req, res) => {
  const universities = await University.find({});

  if (!universities) {
    throw new NotFoundError("No university found");
  }

  res.status(StatusCodes.OK).json({universities});
};

const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find({});
  
    if (!teachers) {
      throw new NotFoundError("No teacher found");
    }
  
    res.status(StatusCodes.OK).json({teachers});
  };

module.exports = {
  getAllUniversities,
  getAllTeachers,
};
