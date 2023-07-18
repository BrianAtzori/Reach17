import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newUniversitySignUp = async function (newUniversityData) {
  axios
    .post(
      `http://localhost:3154/api/v1/auth/register/university`,
      newUniversityData
    )
    .then((res) => {
      writeToLocalStorage(res.data, "universityData");
      alert(
        "Ti sei registrato correttamente a Reach 17, verrai rediretto a breve!"
      );
    });
};

const universityLogin = async function (universityData) {
  axios
    .post(`http://localhost:3154/api/v1/auth/login/university`, universityData)
    .then((res) => {
      writeToLocalStorage(res.data, "universityData");
    });
};

//--- COURSES ---

const createCourse = async function (courseData) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));

  courseData.university = account;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .post(`http://localhost:3154/api/v1/courses/`, courseData, config)
    .then((res) => {
      alert("Corso inserito correttamente!");
    });
};

const getAllCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/courses/`, config)
    .then((res) => {
      return res.data;
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(`http://localhost:3154/api/v1/courses/${id}`, config)
    .then((res) => {
      return res.data;
    });
};

const editCourse = async function (editedCourseData, id) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .patch(
      `http://localhost:3154/api/v1/courses/${id}`,
      editedCourseData,
      config
    )
    .then((res) => {
      alert("Corso modificato correttamente!");
    });
};

const deleteCourse = async function (id) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .delete(`http://localhost:3154/api/v1/courses/${id}`, config)
    .then((res) => {
      alert("Corso eliminato correttamente!");
    });
};

const confirmAssociation = async function (courseID) {
  const { token } = JSON.parse(readLocalStorage("universityData"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .patch(
      `http://localhost:3154/api/v1/courses/university/confirm-association`,
      JSON.parse(JSON.stringify({ courseId: courseID })),
      config
    )
    .then((res) => {
      alert(res.data);
    });
};

const getAllStudents = async function () {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/utilities/university/students`, config)
    .then((res) => {
      return res.data;
    });
};

export {
  newUniversitySignUp,
  universityLogin,
  createCourse,
  getAllCourses,
  getCourse,
  editCourse,
  deleteCourse,
  confirmAssociation,
  getAllStudents,
};
