import React from "react";
import nextId from "react-id-generator";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPendingRequests } from "../../../services/utilities/external-calls";
import EmptyComponent from "../../../components/EmptyComponent";
import LoadingComponent from "../../../components/LoadingComponent";

export default function TeacherPendingRequests() {
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoursesData();
  }, []);

  async function getCoursesData() {
    let coursesList = [];

    coursesList = await getAllPendingRequests().then(() => {
      setIsLoading(false);
    });

    setCourses(coursesList);
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8">
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : courses.length === 0 && loading === false ? (
        <EmptyComponent
          message={"Nessuna richiesta di associazione in attesa"}
        ></EmptyComponent>
      ) : (
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
                <p className="font-montserrat text-center mb-5 break-all">
                  {course.description}
                </p>
                <div className="flex flex-row gap-2 font-lora mb-5">
                  <span>{course.hours + " H |"}</span>
                  <span>{" " + course.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
