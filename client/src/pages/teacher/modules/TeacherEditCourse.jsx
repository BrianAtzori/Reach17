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
import _ from "lodash";
import StudentsEnrolledComponent from "../../../components/StudentsEnrolledComponent";
import EmptyComponent from "../../../components/EmptyComponent";

export default function TeacherEditCourse() {
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
    const universities = await getAllUsersByCategory(
      "teacherData",
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

  async function fetchUnisInfo(universitiesIDs) {
    let fetchedUnis = [];

    console.log(universitiesIDs);

    for (let i = 0; i < universitiesIDs.length; i++) {
      if (universitiesIDs[i].toString().includes("PENDING")) {
        continue;
      } else {
        let university = await retrieveSingleUniversity(universitiesIDs[i]);
        fetchedUnis.push(university[0]);
      }
    }

    return fetchedUnis;
  }

  async function retrieveSingleUniversity(universityID) {
    const university = await getSingleItemByID(
      "teacherData",
      "universities",
      universityID
    );

    return university;
  }

  function sendCourseEditingForm(event) {
    event.preventDefault();

    launchCourseEditing();
  }

  async function mergeUniversities() {
    let newSelectedUniversities = selectedUniversities.map((uni) => {
      return uni._id;
    });

    newSelectedUniversities.push(newUniversity);

    newSelectedUniversities = _.uniq(newSelectedUniversities);

    let newCourse = _.clone(editedCourse);

    newCourse.universities = newSelectedUniversities;

    return newCourse;
  }

  async function launchCourseEditing() {
    let newCourse = await mergeUniversities();
    setEditedCourse(newCourse);

    editCourse(newCourse, id);

    navigator("/teacher/dashboard");
  }

  const handleChange = (event) => {
    setEditedCourse({
      ...editedCourse,
      [event.target.id]: event.target.value,
    });
  };

  const handleUniChange = (event) => {
    setNewUniversity(event.target.value);
  };

  async function courseDeletion() {
    deleteCourse(id);
    navigator("/teacher/dashboard");
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      {editedCourse.title === "" ? (
        <EmptyComponent message={"Corso non trovato"}></EmptyComponent>
      ) : (
        <>
          <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
            <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
              Modifica il tuo corso
            </h1>
            <form
              className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
              onSubmit={sendCourseEditingForm}
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
                  onChange={handleUniChange}
                  value={newUniversity}
                  placeholder="Seleziona un nuovo ateneo"
                >
                  <option value="">Seleziona un nuovo ateneo</option>
                  {universitiesList.map((university) => {
                    return (
                      <option key={nextId()} value={"PENDING:"+university._id}>
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
          <StudentsEnrolledComponent
            mode={"teacher"}
            singleCourseID={id}
          ></StudentsEnrolledComponent>
        </>
      )}
    </div>
  );
}
