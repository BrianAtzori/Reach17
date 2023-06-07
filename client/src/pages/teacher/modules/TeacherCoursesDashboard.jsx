import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { getAllCourses } from "../../../services/teacher/external-calls";

export default function TeacherCoursesDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];
    coursesList = await getAllCourses();

    let index = 0;
    coursesList.forEach((element) => {
      element.number = index++;
    });

    setCourses(coursesList);
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <table className="w-full h-full border-separate border-spacing-2 border border-slate-400 table-auto desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <thead className="font-lora text-2xl text-greensea">
          <tr>
            <td className="py-4">
              <h1>I tuoi corsi</h1>
            </td>
          </tr>
        </thead>
        <tbody className="text-left font-montserrat">
          <tr className="bg-greensea text-white font-semibold">
            <th className="p-4 hidden desktop:table-cell">#</th>
            <th className="p-4 desktop:table-cell">Titolo</th>
            <th className="p-4 hidden desktop:table-cell">Tipologia</th>
            <th className="p-4 hidden desktop:table-cell">Università</th>
          </tr>
          {courses.map((course) => {
            return (
              <tr key={nextId()} className="border-2 border-solid border-jade">
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2">
                  {course.number}
                </td>
                <td className="border-2 border-solid border-jade p-2">
                  {course.title}
                </td>
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2">
                  {course.type}
                </td>
                <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2">
                  {course.universities[0]}
                </td>
                <td className="p-2">
                  <button className="w-full border-2 bg-greensea focus:outline-none focus:shadow-outline max-w-md desktop-4k:mt-20 rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl">Modifica</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
