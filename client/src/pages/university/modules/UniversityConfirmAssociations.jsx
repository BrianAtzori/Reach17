import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { confirmAssociation } from "../../../services/university/external-calls";
import { getAllAssociationRequests } from "../../../services/utilities/external-calls";

export default function UniversityConfirmAssociations() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];

    coursesList = await getAllAssociationRequests();

    setCourses(coursesList);
  }

  function confirmCourseAssociation(courseID) {
    confirmAssociation(courseID);
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8">
      <div className="grid grid-cols-1 gap-5 desktop:grid-cols-3 p-5 desktop-4k:gap-10">
        {courses.map((course) => {
          return (
            <div
              key={nextId()}
              className="justify-around w-full h-full desktop-4k:text-4xl flex flex-col items-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12"
            >
              <h1 className="font-semibold text-jade font-lora text-xl desktop-4k:text-5xl uppercase text-center">
                {course.title}
              </h1>
              <p className="font-montserrat text-center mb-5">
                {course.description}
              </p>
              <div className="flex flex-row gap-2 font-lora mb-5">
                <span>{course.hours + " H |"}</span>
                <span>{" " + course.type}</span>
              </div>
              <button
                onClick={() => confirmCourseAssociation(course._id)}
                className="w-full border-2 bg-greensea focus:outline-none focus:shadow-outline max-w-md rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl"
              >
                Conferma richiesta
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
