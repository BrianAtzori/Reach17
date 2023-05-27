import axios from "axios";

const newStudentSignUp = async function (newStudentData) {
  console.log(newStudentData);
  axios
    .post(`http://localhost:3154/api/v1/auth/register`, newStudentData)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    });
};

export { newStudentSignUp };
