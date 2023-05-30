import axios from "axios";
import { writeToLocalStorage } from "../local-storage";

const newUniversitySignUp = async function (newUniversityData) {
  console.log(newUniversityData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register/university`, newUniversityData)
    .then((res) => {
      writeToLocalStorage(res.data,"universityData")
    });
};

const universityLogin = async function (universityData) {
  console.log(universityData);
  axios
    .post(`http://localhost:3154/api/v1/auth/login/university`, universityData)
    .then((res) => {
      writeToLocalStorage(res.data,"universityData")
    });
};

export { newUniversitySignUp, universityLogin };
