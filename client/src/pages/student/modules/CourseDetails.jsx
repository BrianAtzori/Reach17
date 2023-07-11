import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCourse } from "../../../services/student/external-calls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSingleItemByID,
  getAllUsersByCategory,
} from "../../../services/utilities/external-calls";
import nextId from "react-id-generator";
import _ from "lodash";

export default function CourseDetails() {
  const [editedCourse, setEditedCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    universities: [],
    status: "",
    hours: "",
    type: "",
  });

  const [universitiesList, setUniversitiesList] = useState([]);

  const [selectedUniversities, setSelectedUniversities] = useState([]);

  const [newUniversity, setNewUniversity] = useState({});

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    let course = await retrieveCourseData(id);
    setEditedCourse(course);

    let universities = await retrieveAllUniversities();
    setUniversitiesList(universities);

    let selectedUnis = await retrieveSelectedUniversities();
    setSelectedUniversities(selectedUnis);
  }

  async function retrieveCourseData(courseID) {
    let selectedCourseData = {};
    selectedCourseData = await getCourse(courseID);
    return selectedCourseData;
  }

  async function retrieveAllUniversities() {
    const { universities } = await getAllUsersByCategory(
      "studentData",
      "universities"
    );

    return universities;
  }

  async function retrieveSelectedUniversities() {
    let retrievedUniversities = [];

    retrievedUniversities = await retrieveCourseData(id)
      .then((data) => {
        return data;
      })
      .then(async (course) => {
        let fetchedUniversities = [];
        fetchedUniversities = await fetchUnisInfo(course.universities);
        return fetchedUniversities;
      })
      .then((unis) => {
        return unis;
      });

    return retrievedUniversities;
  }

  async function fetchUnisInfo(universtitiesIDs) {
    let fetchedUnis = [];

    for (let i = 0; i < universtitiesIDs.length; i++) {
      let university = await retrieveSingleUniversity(universtitiesIDs[i]);
      fetchedUnis.push(university.university[0]);
    }

    return fetchedUnis;
  }

  async function retrieveSingleUniversity(universityID) {
    const university = await getSingleItemByID(
      "studentData",
      "universities",
      universityID
    );

    return university;
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald h-screen">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Dettagli corso
        </h1>
        <div
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
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
              readOnly
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
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Attualmente il tuo corso è erogato in questi Atenei:
            </label>
            <div className="flex flex-row flex-wrap gap-2 justify-around">
              {selectedUniversities.map((university) => {
                return (
                  <span
                    key={nextId()}
                    className="bg-greensea text-white font-semibold p-2 rounded-lg"
                  >
                    {university.universityName}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Seleziona qui un nuovo Ateneo:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="universities"
              name="universities"
              value={newUniversity}
              placeholder="Seleziona un nuovo ateneo"
              readOnly
            >
              <option value="">Seleziona un nuovo ateneo</option>
              {universitiesList.map((university) => {
                return (
                  <option key={nextId()} value={university._id}>
                    {university.universityName}
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
              value={editedCourse.hours}
              readOnly
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
              value={editedCourse.type}
              readOnly
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
              readOnly
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
