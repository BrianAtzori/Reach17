const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  universities: {
    type: Array,
  },
  status: {
    type: String,
  },
  hours: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registrations: {
    type: Array,
  },
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref:'Teacher',
    required:[true, "Please provide a teacher ID or a university ID"]
  }
});

module.exports = mongoose.model("Course", CourseSchema);
