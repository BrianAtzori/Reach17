require("dotenv").config();
const mongoose = require("mongoose");
const University = require("../models/user-university");
const Teacher = require("../models/user-teacher");
const Student = require("../models/user-student");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: `);
});

//--- STUDENT AUTHENTICATION ---

it("should throw an error if authentication is given a wrong password", async () => {
  try {
    await new Student({
      name: "Studente",
      surname: "Di Test",
      email: "test@studente.it",
      password: "Testing@2020",
      studentCode: "SWEENDVU",
      university: "649d1b8fed45ab81023f1d6b",
    }).save();

    let result = await Student.findOne({ email: "test@studente.it" });

    let wrongPassword = "123456";

    let auth = await result.pwdCheck(wrongPassword);

    expect(auth).toEqual(false);

    await Student.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

it("should authenticate successfully if given correct password", async () => {
  try {
    await new Student({
      name: "Studente",
      surname: "Di Test",
      email: "test@studente.it",
      password: "Testing@2020",
      studentCode: "SWEENDVU",
      university: "649d1b8fed45ab81023f1d6b",
    }).save();

    let result = await Student.findOne({ email: "test@studente.it" });

    let correctPassword = "Testing@2020";

    let auth = await result.pwdCheck(correctPassword);

    expect(auth).toEqual(true);

    await Student.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

//--- TEACHER AUTHENTICATION ---
it("should throw an error if authentication is given a wrong password", async () => {
  try {
    await new Teacher({
      name: "Teacher",
      surname: "Di Test",
      email: "test@teacher.it",
      password: "Testing@2020",
      degrees: "Testing",
      university: "649d1b8fed45ab81023f1d6b",
    }).save();

    let result = await Teacher.findOne({ email: "test@teacher.it" });

    let wrongPassword = "123456";

    let auth = await result.pwdCheck(wrongPassword);

    expect(auth).toEqual(false);

    await Teacher.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

it("should authenticate successfully if given correct password", async () => {
  try {
    await new Teacher({
      name: "Teacher",
      surname: "Di Test",
      email: "test@teacher.it",
      password: "Testing@2020",
      degrees: "Testing",
      university: "649d1b8fed45ab81023f1d6b",
    }).save();

    let result = await Teacher.findOne({ email: "test@teacher.it" });

    let correctPassword = "Testing@2020";

    let auth = await result.pwdCheck(correctPassword);

    expect(auth).toEqual(true);

    await Teacher.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

//--- UNIVERSITY AUTHENTICATION ---
it("should throw an error if authentication is given a wrong password", async () => {
  try {
    await new University({
      name: "Ateneo",
      surname: "Di Test",
      email: "test@ateneo.it",
      password: "Testing@2020",
      courses: "",
      universityName: "UniTesting",
    }).save();

    let result = await University.findOne({ email: "test@ateneo.it" });

    let wrongPassword = "123456";

    let auth = await result.pwdCheck(wrongPassword);

    expect(auth).toEqual(false);

    await University.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

it("should authenticate successfully if given correct password", async () => {
  try {
    await new University({
      name: "Ateneo",
      surname: "Di Test",
      email: "test@ateneo.it",
      password: "Testing@2020",
      courses: "",
      universityName: "UniTesting",
    }).save();

    let result = await University.findOne({ email: "test@ateneo.it" });

    let correctPassword = "Testing@2020";

    let auth = await result.pwdCheck(correctPassword);

    expect(auth).toEqual(true);

    await University.deleteOne(result);
  } catch (err) {
    throw new Error(err);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});
