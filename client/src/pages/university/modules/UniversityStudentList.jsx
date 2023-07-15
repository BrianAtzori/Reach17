import React from "react";
import StudentsEnrolledComponent from "../../../components/StudentsEnrolledComponent";

export default function UniversityStudentList() {
  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8">
      <StudentsEnrolledComponent
        mode={"university"}
      ></StudentsEnrolledComponent>
    </div>
  );
}
