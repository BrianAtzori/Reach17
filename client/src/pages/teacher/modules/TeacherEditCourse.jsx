import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  getCourse,
  editCourse,
  deleteCourse,
} from "../../../services/teacher/external-calls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSingleItemByID,
  getAllUsersByCategory,
} from "../../../services/utilities/external-calls";
import nextId from "react-id-generator";

export default function TeacherEditCourse() {

  const [editedCourse, setEditedCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    universities: "",
    status: "",
    hours: "",
    type: "",
  });

  const [universitiesList, setUniversitiesList] = useState([]);

  // const [selectedUniversity, setSelectedUniversity] = useState({
  //   _id: "",
  //   name: "",
  //   surname: "",
  //   email: "",
  //   universityName: "",
  //   courses: [],
  //   teachers: [],
  // });

  const [selectedUniversities, setSelectedUniversities] = useState([]);

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    retrieveData(id);
    retrieveUniversities();
  }, []);

  async function retrieveData(courseID) {
    let selectedCourseData = {};

    let retrievedUniversities = [];

    selectedCourseData = await getCourse(courseID);

    selectedCourseData.universities.forEach(async (university) => {
      let retrievedData = await retrieveUniversity(university);
      retrievedUniversities.push(retrievedData.university[0]);
      setSelectedUniversities(retrievedUniversities);
    });

    setEditedCourse(selectedCourseData);
  }

  async function retrieveUniversity(universityID) {
    const university = await getSingleItemByID(
      "teacherData",
      "universities",
      universityID
    );

    return university;
  }

  async function retrieveUniversities() {
    const { universities } = await getAllUsersByCategory(
      "universityData",
      "universities"
    );

    setUniversitiesList(universities);
  }

  function sendRegistrationForm(event) {
    event.preventDefault();
    editCourse(editedCourse, id);
    navigator("/teacher/dashboard");
  }

  const handleChange = (event) => {
    setEditedCourse({ ...editedCourse, [event.target.id]: event.target.value });
  };

  async function courseDeletion() {
    deleteCourse(id);
    navigator("/teacher/dashboard");
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald h-screen">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Modifica il tuo corso
        </h1>
        <form
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
          onSubmit={sendRegistrationForm}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="title"
            >
              Titolo del corso
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Inserisci il nuovo titolo per il tuo corso"
              value={editedCourse.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="description"
            >
              Descrizione del corso
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Modifica la descrizione del tuo corso"
              value={editedCourse.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Atenei
            </label>
            {/* <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="universities"
              name="universities"
              onChange={handleChange}
              value={editedCourse.universities}
            >
              <option value={selectedUniversities.id}>
                {selectedUniversities.universityName}
              </option>
              {universitiesList.map((university) => {
                return (
                  <option key={nextId()} value={university._id}>
                    {university.universityName}
                  </option>
                );
              })}
            </select> */}
            {selectedUniversities.map((selectedUniversity) => {
              return (
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="universities"
                  name="universities"
                  onChange={handleChange}
                  key={nextId()}
                  value={selectedUniversity.universityName}
                >
                  {universitiesList.map((university) => {
                    return (
                      <option key={nextId()} value={university._id}>
                        {university.universityName}
                      </option>
                    );
                  })}
                </select>
              );
            })}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="hours"
            >
              Numero ore corso
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="hours"
              type="number"
              placeholder="Inserisci il numero di ore del tuo corso"
              value={editedCourse.hours}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="type"
            >
              Tipologia di corso
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              onChange={handleChange}
              value={editedCourse.type}
            >
              <option value="">Seleziona la tipologia di corso</option>
              <option value="Teorico">Teorico</option>
              <option value="Pratico">Pratico</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-10">
            <input
              className=" w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
              type="submit"
              value="Modifica corso"
            ></input>
          </div>
        </form>
        <button
          onClick={courseDeletion}
          className=" w-full border-2 text-white bg-red-500 mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-red-500 hover:border-2 hover:border-solid"
        >
          Elimina corso
        </button>
      </div>
    </div>
  );
}
