import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleItemByID } from "../../../services/utilities/external-calls";
import { getAllCourseRegistrations } from "../../../services/student/external-calls";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];
    coursesList = await getAllCourseRegistrations();

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
    const teacher = await getSingleItemByID("studentData", "teachers", id);

    let teacherFullName = await (teacher.name + " " + teacher.surname);

    return teacherFullName;
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8">
      <table className="w-full h-full border-separate border-spacing-2 border border-slate-400 table-auto desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 mx-auto desktop-4k:rounded-2xl desktop-4k:p-12">
        <thead className="font-lora text-2xl text-greensea">
          <tr>
            <td className="py-4">
              <h1 className="desktop-4k:text-6xl">
                I corsi a cui sei iscritt*
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
