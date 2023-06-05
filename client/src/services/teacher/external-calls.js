import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";


// --- AUTH --- 

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

//--- COURSES --- 

const createCourse = async function (courseData){

  // console.log(courseData);

  // console.log(JSON.parse(readLocalStorage("teacherData")))

  const {token, account} = JSON.parse(readLocalStorage("teacherData"))

  courseData.teacher = account

  console.log(token);

  console.log(courseData)

  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }

  axios
  .post(`http://localhost:3154/api/v1/courses/`, courseData, config)
  .then((res) =>{
    alert("Corso inserito correttamente!")
    console.log(res.data)
  });

}

export { newTeacherSignUp, teacherLogin, createCourse };
