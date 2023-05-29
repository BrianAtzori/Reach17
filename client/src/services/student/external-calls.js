import axios from "axios";
import { writeToLocalStorage } from "../local-storage";

const newStudentSignUp = async function (newStudentData) {
  console.log(newStudentData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register`, newStudentData)
    .then((res) => {
      writeToLocalStorage(res.data,"studentData")
    });
};

export { newStudentSignUp };
