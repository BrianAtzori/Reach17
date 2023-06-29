const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserTeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide a name to subscribe to My Impact"],
    minLength: 3,
    maxLength: 50,
  },
  surname: {
    type: String,
    required: [true, "You must provide a surname to subscribe to My Impact"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "You must provide an email to subscribe to My Impact"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "You must provide a Password to subscribe to My Impact"],
    minLength: 6,
  },
  degrees: {
    type: String,
  },
  courses: {
    type: Array,
  },
});

UserTeacherSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserTeacherSchema.methods.JWTGeneration = function () {
  return jwt.sign({ userID: this._id, email: this.email }, process.env.SEC_J, {
    expiresIn: process.env.J_LIFT,
  });
};

UserTeacherSchema.methods.pwdCheck = async function (attempt) {
  const matching = await bcrypt.compare(attempt, this.password);
  return matching;
};

module.exports = mongoose.model("Teacher", UserTeacherSchema);
