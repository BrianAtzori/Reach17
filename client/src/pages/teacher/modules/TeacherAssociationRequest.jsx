import React from "react";
import nextId from "react-id-generator";
import { useState, useEffect } from "react";
import { getAllUsersByCategory } from "../../../services/utilities/external-calls";
import { useNavigate } from "react-router-dom";
import {
  getAllCourses,
  associateCourse,
} from "../../../services/teacher/external-calls";

export default function TeacherAssociationRequest() {
  const [courseToAssociate, setCourseToAssociate] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [universityToAssociate, setUniversityToAssociate] = useState("");
  const [universitiesList, setUniversitiesList] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    retrieveUniversities();
    getCoursesData();
  }, []);

  async function retrieveUniversities() {
    const universities = await getAllUsersByCategory(
      "teacherData",
      "universities"
    );
    setUniversitiesList(universities);
  }

  async function getCoursesData() {
    let courses = [];
    courses = await getAllCourses();
    setCourseList(courses);
  }

  const handleChange = (event) => {
    switch (event.target.id) {
      case "course":
        setCourseToAssociate(event.target.value);
        break;
      case "university":
        setUniversityToAssociate(event.target.value);
        break;
      default:
        alert("Errore, riprova!");
        break;
    }
  };

  function sendAssociationForm(event) {
    event.preventDefault();
    if (courseToAssociate === "" || universityToAssociate === "") {
      alert("Verifica i dati inseriti, alcuni campi sono vuoti!");
    } else {
      associateCourse(courseToAssociate, universityToAssociate);
      navigator("/teacher/dashboard");
    }
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Richiedi l'associazione di un corso
        </h1>
        <form
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
          onSubmit={sendAssociationForm}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Seleziona uno dei tuoi corsi
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="course"
              name="course"
              onChange={handleChange}
              placeholder="Seleziona il primo Ateneo per il tuo corso"
              value={courseToAssociate}
            >
              <option value=""></option>
              {courseList.map((course) => {
                return (
                  <option key={nextId()} value={course._id}>
                    {course.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="type"
            >
              Seleziona un ateneo
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="university"
              name="university"
              onChange={handleChange}
              placeholder="Seleziona la tipologia di corso"
              value={universityToAssociate}
            >
              <option value=""></option>
              {universitiesList.map((university) => {
                return (
                  <option key={nextId()} value={university._id}>
                    {university.universityName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <input
              className=" w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
              type="submit"
              value="Richiedi associazione"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
