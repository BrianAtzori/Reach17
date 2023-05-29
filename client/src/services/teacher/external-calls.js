import axios from "axios";
import { writeToLocalStorage } from "../local-storage";

const newTeacherSignUp = async function (newTeacherData) {
  console.log(newTeacherData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register/teacher`, newTeacherData)
    .then((res) => {
      writeToLocalStorage(res.data,"teacherData")
    });
};

const teacherLogin = async function (teacherData) {
  console.log(teacherData);
  axios
    .post(`http://localhost:3154/api/v1/auth/login/teacher`, teacherData)
    .then((res) => {
      writeToLocalStorage(res.data,"teacherData")
    });
};

export { newTeacherSignUp, teacherLogin };
