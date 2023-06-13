import axios from "axios";
import { readLocalStorage } from "../local-storage";

const getAllUsersByCategory = async function (userData, category) {
  const { token } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/utilities/${category}`, config)
    .then((res) => {
      return res.data;
    });
};

export { getAllUsersByCategory };
