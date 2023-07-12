import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getSingleItemByID } from "../../../services/utilities/external-calls";
import {
  getAllUniversityCourses,
  courseSignUp,
} from "../../../services/student/external-calls";

export default function StudentCoursesDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];
    coursesList = await getAllUniversityCourses();

    console.log(coursesList);

    let index = 0;
    coursesList.forEach((element) => {
      element.number = index++;
    });

    getTeachersData(coursesList);
  }

  async function getTeachersData(coursesList) {
    let formattedCourseData = [];

    for (let i = 0; i < coursesList.length; i++) {
      formattedCourseData.push(coursesList[i]);
    }

    for (let i = 0; i < formattedCourseData.length; i++) {
      await retrieveTeacher(formattedCourseData[i].teacher).then(
        (teacherRetrieved) => {
          formattedCourseData[i].teacher = teacherRetrieved;
          return formattedCourseData[i];
        }
      );
    }
    setCourses(formattedCourseData);
  }

  async function retrieveTeacher(id) {
    const { teacher } = await getSingleItemByID("studentData", "teachers", id);

    let teacherFullName = await (teacher[0].name + " " + teacher[0].surname);

    return teacherFullName;
  }

  async function signUpForCourse(id) {
    await courseSignUp(id);
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <table className="w-full h-full border-separate border-spacing-2 border border-slate-400 table-auto desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 mx-auto desktop-4k:rounded-2xl desktop-4k:p-12">
        <thead className="font-lora text-2xl text-greensea">
          <tr>
            <td className="py-4">
              <h1 className="desktop-4k:text-6xl">
                Corsi disponibili nel tuo ateneo
              </h1>
            </td>
          </tr>
        </thead>
        <tbody className="text-left font-montserrat">
          <tr className="bg-greensea text-white font-semibold">
            <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
              #
            </th>
            <th className="p-4 desktop:table-cell desktop-4k:px-10">Titolo</th>
            <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
              Tipologia
            </th>
            <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
              Descrizione
            </th>
          </tr>
          {courses.map((course) => {
            return (
              <tr key={nextId()} className="border-2 border-solid border-jade">
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                  {course.number}
                </td>
                <td className="border-2 border-solid border-jade p-2 desktop-4k:px-10">
                  {course.title}
                </td>
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                  {course.type}
                </td>
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                  {course.description}
                </td>
                <td className="p-2 desktop-4k:px-10">
                  <div className="w-full flex justify-around">
                    <Link to={`/student/course-details/${course._id}`}>
                      <button className="w-full h-full border-2 bg-greensea focus:outline-none focus:shadow-outline max-w-md rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl">
                        Visualizza dettagli
                      </button>
                    </Link>
                    <div>
                      <button
                        onClick={() => signUpForCourse(course._id)}
                        className="w-full h-full border-2 bg-greensea focus:outline-none focus:shadow-outline max-w-md rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl"
                      >
                        Iscriviti al corso
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
