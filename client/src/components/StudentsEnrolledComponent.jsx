import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { getAllStudents } from "../services/university/external-calls";
import { getAllStudentsEnrolled } from "../services/utilities/external-calls";
import EmptyComponent from "./EmptyComponent";
import LoadingComponent from "./LoadingComponent";

export default function StudentsEnrolledComponent({ mode, singleCourseID }) {
  const [students, setStudents] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentsData();
  }, []);

  async function getStudentsData() {
    let studentsList = [];

    switch (mode) {
      case "university": //La singola uni vuole vedere tutti i suoi studenti
        studentsList = await getAllStudents().then(setIsLoading(false));
        break;
      case "teacher": //Il teacher vede il singolo corso
        studentsList = await getAllStudentsEnrolled(
          singleCourseID,
          "teacherData"
        ).then(setIsLoading(false));
        break;
      case "universityCourse": //L'uni vede tutti gli studenti di un corso
        studentsList = await getAllStudentsEnrolled(
          singleCourseID,
          "universityData"
        ).then(setIsLoading(false));
        break;
      default:
        alert("Errore, riprova!");
        break;
    }
    setStudents(studentsList);
  }

  return (
    <>
      {loading && <LoadingComponent></LoadingComponent>}
      {students.length === 0 && loading === false ? (
        <EmptyComponent message={"Nessuno studente iscritto"}></EmptyComponent>
      ) : (
        <table className="mt-5 w-full h-full border-separate border-spacing-2 border border-slate-400 table-auto desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 mx-auto desktop-4k:rounded-2xl desktop-4k:p-12 min-w-full">
          <thead className="font-lora text-2xl text-greensea">
            <tr>
              <td className="py-4">
                <h1 className="desktop-4k:text-6xl">Elenco studenti</h1>
              </td>
            </tr>
          </thead>
          <tbody className="text-left font-montserrat">
            <tr className="bg-greensea text-white font-semibold">
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                Matricola
              </th>
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                Nome
              </th>
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                Cognome
              </th>
              <th className="p-4 desktop:table-cell desktop-4k:px-10">
                Indirizzo Email
              </th>
            </tr>
            {students.map((student) => {
              return (
                <tr
                  key={nextId()}
                  className="border-2 border-solid border-jade"
                >
                  <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                    {student.studentCode}
                  </td>
                  <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                    {student.name}
                  </td>
                  <td className="hidden desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                    {student.surname}
                  </td>
                  <td className=" desktop:table-cell border-2 border-solid border-jade p-2 desktop-4k:px-10">
                    {student.email}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
