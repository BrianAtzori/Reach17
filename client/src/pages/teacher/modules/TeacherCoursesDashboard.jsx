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

    console.log("Corsi:");
    console.log(coursesList);

    setCourses(coursesList);
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <table className="border-separate border-spacing-2 border border-slate-400 table-auto w-full h-full desktop-4k:text-4xl flex flex-col items-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <thead className="font-lora text-lg">
          <tr>
            <td>
              <h1>I tuoi corsi</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>#</th>
            <th>Titolo</th>
            <th>Tipologia</th>
            <th>Università</th>
          </tr>
          {courses.map((course) => {
            return (
              <tr key={nextId()} className="">
                <td>{course.number}</td>
                <td>{course.title}</td>
                <td>{course.type}</td>
                <td>{course.universities[0]}</td>
                <td>
                  <button>Modifica</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
