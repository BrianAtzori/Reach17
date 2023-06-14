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

const getSingleItemByStoredID = async function (userData, category) {
  const { token, id } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/utilities/${category}/${id}`, config)
    .then((res) => {
      return res.data;
    });
};

const getSingleItemByID = async function (userData, category, givenID) {
  const { token } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(
      `http://localhost:3154/api/v1/utilities/${category}/${givenID}`,
      config
    )
    .then((res) => {
      return res.data;
    });
};

export { getAllUsersByCategory, getSingleItemByStoredID,getSingleItemByID };
