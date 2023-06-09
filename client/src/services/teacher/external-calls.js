import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newTeacherSignUp = async function (newTeacherData) {
  console.log(newTeacherData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register/teacher`, newTeacherData)
    .then((res) => {
      writeToLocalStorage(res.data, "teacherData");
      alert("Ti sei registrato correttamente a MyImpact, verrai rediretto a breve!")
    });
};

const teacherLogin = async function (teacherData) {
  console.log(teacherData);
  axios
    .post(`http://localhost:3154/api/v1/auth/login/teacher`, teacherData)
    .then((res) => {
      writeToLocalStorage(res.data, "teacherData");
    });
};

//--- COURSES ---

const createCourse = async function (courseData) {
  // console.log(courseData);

  // console.log(JSON.parse(readLocalStorage("teacherData")))

  const { token, account } = JSON.parse(readLocalStorage("teacherData"));

  courseData.teacher = account;

  // console.log(token);

  // console.log(courseData)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .post(`http://localhost:3154/api/v1/courses/`, courseData, config)
    .then((res) => {
      alert("Corso inserito correttamente!");
      console.log(res.data);
    });
};

const getAllCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/courses/`, config)
    .then((res) => {
      return res.data.courses;
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(`http://localhost:3154/api/v1/courses/${id}`, config)
    .then((res) => {
      return res.data.course;
    });
};

const editCourse = async function (editedCourseData, id) {
  const { token, account } = JSON.parse(readLocalStorage("teacherData"));
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
      console.log(res.data);
    });
};

const deleteCourse = async function (id)
{
  const { token, account } = JSON.parse(readLocalStorage("teacherData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .delete(
      `http://localhost:3154/api/v1/courses/${id}`,
      config
    )
    .then((res) => {
      alert("Corso eliminato correttamente!");
      console.log(res.data);
    });
}

export {
  newTeacherSignUp,
  teacherLogin,
  createCourse,
  getAllCourses,
  getCourse,
  editCourse,
  deleteCourse
};
