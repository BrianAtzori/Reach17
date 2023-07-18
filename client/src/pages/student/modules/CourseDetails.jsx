import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCourse } from "../../../services/student/external-calls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSingleItemByID } from "../../../services/utilities/external-calls";
import nextId from "react-id-generator";
import _ from "lodash";
import { courseSignUp } from "../../../services/student/external-calls";

export default function CourseDetails() {
  const [selectedCourse, setSelectedCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    universities: [],
    status: "",
    hours: "",
    type: "",
  });

  const [selectedUniversities, setSelectedUniversities] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    degrees: "",
    courses: [""],
    universities: [""],
  });

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    let course = await retrieveCourseData(id);
    setSelectedCourse(course);

    let selectedUnis = await retrieveSelectedUniversities();
    setSelectedUniversities(selectedUnis);

    let teacher = await retrieveSingleTeacher();
    setSelectedTeacher(teacher);
  }

  async function retrieveCourseData(courseID) {
    let selectedCourseData = {};
    selectedCourseData = await getCourse(courseID);
    return selectedCourseData;
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
      fetchedUnis.push(university[0]);
    }

    return fetchedUnis;
  }

  async function retrieveSingleUniversity(universityID) {
    const {university} = await getSingleItemByID(
      "studentData",
      "universities",
      universityID
    );

    return university;
  }

  async function retrieveSingleTeacher() {
    let retrievedTeacher = [];

    retrievedTeacher = await retrieveCourseData(id)
      .then((data) => {
        return data;
      })
      .then(async (course) => {
        let fetchedTeacher = [];
        fetchedTeacher = await getSingleItemByID(
          "studentData",
          "teachers",
          course.teacher
        );
        return fetchedTeacher[0];
      });

    return retrievedTeacher;
  }

  async function signUpForCourse(id) {
    await courseSignUp(id);
    navigator("/student/dashboard/");
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Dettagli del corso{" "}
          <span className="underline">{selectedCourse.title}</span>
        </h1>
        <div className="mb-4 items-start font-montserrat text-gray w-full">
          <div className="mb-4 ">
            <p>{selectedCourse.description}</p>
          </div>
          <div className="my-6 items-start font-montserrat text-gray w-full">
            <label className="text-xl font-semibold">
              Il tuo insegnante sarà:
            </label>
            <img
              className=" mt-4 w-32 h-32 rounded-full mx-auto"
              src="https://picsum.photos/200"
              alt="Profile"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
              {selectedTeacher.name + " " + selectedTeacher.surname}
            </h2>
            <div className="flex justify-center mt-5">
              <a href={"mailto:" + selectedTeacher.email} className="underline">
                {selectedTeacher.email}
              </a>
            </div>
            <div className="mt-5">
              <h3 className="block text-sm font-bold mb-2 desktop-4k:text-4xl">
                Lauree e certificazioni:
              </h3>
              <p className="mt-2">{selectedTeacher.degrees}</p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="block text-sm font-bold mb-2 desktop-4k:text-4xl">
              Tipologia corso:
            </h3>
            Il corso è di tipo {selectedCourse.type} per un totale di{" "}
            {selectedCourse.hours} ore di formazione.
          </div>
          <div className="mt-8">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Il corso è erogato anche in altri atenei:
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
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => signUpForCourse(selectedCourse._id)}
              className="w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
            >
              Iscriviti al corso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
