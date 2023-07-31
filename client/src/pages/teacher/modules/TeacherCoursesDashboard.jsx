import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { getAllCourses } from "../../../services/teacher/external-calls";
import { Link } from "react-router-dom";
import { getSingleItemByID } from "../../../services/utilities/external-calls";
import EmptyComponent from "../../../components/EmptyComponent";
import LoadingComponent from "../../../components/LoadingComponent";

export default function TeacherCoursesDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];
    coursesList = await getAllCourses();

    if (coursesList.length > 0) {
      let index = 0;
      coursesList.forEach((element) => {
        element.number = index++;
      });
    }

    getUniversitiesData(coursesList);
  }

  async function getUniversitiesData(coursesList) {
    let formattedCourseData = [];

    for (let i = 0; i < coursesList.length; i++) {
      formattedCourseData.push(coursesList[i]);
    }

    for (let i = 0; i < formattedCourseData.length; i++) {
      for (let x = 0; x < formattedCourseData[i].universities.length; x++) {
        if (
          formattedCourseData[i].universities[x].toString().includes("PENDING")
        ) {
          formattedCourseData[i].universities[x] =
            "In attesa di conferma dall'Ateneo principale";
        } else {
          await retrieveUniversity(formattedCourseData[i].universities[x]).then(
            (universityRetrieved) => {
              formattedCourseData[i].universities[x] = universityRetrieved;
              return formattedCourseData[i];
            }
          );
        }
      }
    }

    setCourses(formattedCourseData);

    setIsLoading(false);
  }

  async function retrieveUniversity(id) {
    const university = await getSingleItemByID(
      "teacherData",
      "universities",
      id
    );

    return university[0].universityName;
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8 min-w-full w-fit">
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : courses.length === 0 && loading === false ? (
        <EmptyComponent
          message={
            "Non hai ancora creato un corso o non è stato ancora confermato dall'Ateneo e gli Atenei non ti hanno ancora assegnato delle lezioni"
          }
        ></EmptyComponent>
      ) : (
        <table className="w-full h-full border-separate border-spacing-2 border border-slate-400 table-auto desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 mx-auto desktop-4k:rounded-2xl desktop-4k:p-12">
          <thead className="font-lora text-2xl text-greensea">
            <tr>
              <td className="py-4">
                <h1 className="desktop-4k:text-6xl">I tuoi corsi</h1>
              </td>
            </tr>
          </thead>
          <tbody className="text-left font-montserrat">
            <tr className="bg-greensea text-white font-semibold">
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                #
              </th>
              <th className="p-4 desktop:table-cell desktop-4k:px-10">
                Titolo
              </th>
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                Tipologia
              </th>
              <th className="p-4 hidden desktop:table-cell desktop-4k:px-10">
                Università
              </th>
            </tr>
            {courses.map((course) => {
              return (
                <tr
                  key={nextId()}
                  className="border-2 border-solid border-jade"
                >
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
                    {course.universities[0]}
                  </td>
                  <td className="p-2 desktop-4k:px-10">
                    <Link to={`/teacher/edit-course/${course._id}`}>
                      <button className="w-full border-2 bg-greensea focus:outline-none focus:shadow-outline max-w-md rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl">
                        Modifica
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
