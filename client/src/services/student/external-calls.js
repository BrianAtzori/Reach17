import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newStudentSignUp = async function (newStudentData) {
  console.log(newStudentData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register`, newStudentData)
    .then((res) => {
      writeToLocalStorage(res.data, "studentData");
      alert(
        "Ti sei registrato correttamente a MyImpact, verrai rediretto a breve!"
      );
    });
};

const studentLogin = async function (studentData) {
  console.log(studentData);
  axios
    .post(`http://localhost:3154/api/v1/auth/login`, studentData)
    .then((res) => {
      writeToLocalStorage(res.data, "studentData");
    });
};

//--- COURSES ---

const getAllUniversityCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/courses/student/available-courses`,
      config
    )
    .then((res) => {
      return res.data;
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(`http://localhost:3154/api/v1/courses/student/course-details/${id}`, config)
    .then((res) => {
      return res.data.course;
    });
};

export { newStudentSignUp, studentLogin, getAllUniversityCourses, getCourse };
