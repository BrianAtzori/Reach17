import React from "react";
import { useState, useEffect } from "react";
import { createCourse } from "../../../services/university/external-calls";
import { useNavigate } from "react-router-dom";
import {
  getAllUsersByCategory,
  getSingleItemByStoredID,
} from "../../../services/utilities/external-calls";
import nextId from "react-id-generator";

export default function UniversityCreateCourse() {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    universities: [],
    status: "",
    hours: "",
    type: "",
  });

  const [teachersList, setTeachersList] = useState([]);
  const [retrievedUniversity, setRetrievedUniversity] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    retrieveTeachers();
    retrieveSingleUniversity();
  }, []);

  async function retrieveTeachers() {
    const teachers = await getAllUsersByCategory("universityData", "teachers");
    setTeachersList(teachers);
  }

  async function retrieveSingleUniversity() {
    const university = await getSingleItemByStoredID(
      "universityData",
      "universities"
    );
    setRetrievedUniversity(university[0]);
  }

  function sendCourseCreationForm(event) {
    event.preventDefault();

    if (
      newCourse.title === "" ||
      newCourse.description === "" ||
      newCourse.hours === "" ||
      newCourse.teacher === "" ||
      newCourse.type === ""
    ) {
      alert("Verifica i dati inseriti, alcuni campi sono vuoti!");
    } else {
      createCourse(newCourse);
      navigator("/university/dashboard");
    }
  }

  const handleChange = (event) => {
    setNewCourse({
      ...newCourse,
      [event.target.id]: event.target.value,
      universities: [retrievedUniversity._id],
    });
  };

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Creazione corsi
        </h1>
        <form
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
          onSubmit={sendCourseCreationForm}
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
              placeholder="Inserisci il titolo del tuo nuovo corso"
              value={newCourse.title}
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
              placeholder="Elenca in breve gli argomenti trattati all'interno del corso"
              value={newCourse.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Ateneo
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="universities"
              name="universties"
              onChange={handleChange}
              value={retrievedUniversity.universityName}
            >
              <option value={retrievedUniversity._id}>
                {retrievedUniversity.universityName}
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="Teacher"
            >
              Insegnante
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="teacher"
              name="teacher"
              onChange={handleChange}
              placeholder="Seleziona l'insegnante del tuo corso"
              value={newCourse.teacher}
            >
              <option>Seleziona l'insegnante del tuo corso</option>
              {teachersList.map((teacher) => {
                return (
                  <option key={nextId()} value={teacher._id}>
                    {teacher.name + " " + teacher.surname}
                  </option>
                );
              })}
            </select>
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
              value={newCourse.hours}
              onChange={handleChange}
              min="0"
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
              placeholder="Seleziona la tipologia di corso"
              value={newCourse.type}
            >
              <option value="">Seleziona la tipologia di corso</option>
              <option value="Teorico">Teorico</option>
              <option value="Pratico">Pratico</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <input
              className=" w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
              type="submit"
              value="Aggiungi corso"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
