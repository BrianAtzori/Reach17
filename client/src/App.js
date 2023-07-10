import React from "react";
import LandingPage from "./pages/general/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/student/LoginPage";
import RegistrationPage from "./pages/student/RegistrationPage";
import SelectRegistrationPage from "./pages/general/SelectRegistrationPage";
import TeacherRegistrationPage from "./pages/teacher/TeacherRegistrationPage";
import TeacherLoginPage from "./pages/teacher/TeacherLoginPage";
import SelectLoginPage from "./pages/general/SelectLoginPage";
import UniversityRegistrationPage from "./pages/university/UniversityRegistrationPage";
import UniversityLoginPage from "./pages/university/UniversityLoginPage";
import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherCreateCourse from "./pages/teacher/modules/TeacherCreateCourse";
import TeacherCoursesDashboard from "./pages/teacher/modules/TeacherCoursesDashboard";
import TeacherEditCourse from "./pages/teacher/modules/TeacherEditCourse";
import UniversityHome from "./pages/university/UniversityHome";
import UniversityCreateCourse from "./pages/university/modules/UniversityCreateCourse";
import UniversityCourseDashboard from "./pages/university/modules/UniversityCourseDashboard";
import UniversityEditCourse from "./pages/university/modules/UniversityEditCourse";
import TeacherAssociationRequest from "./pages/teacher/modules/TeacherAssociationRequest";
import UniversityConfirmAssociations from "./pages/university/modules/UniversityConfirmAssociations";
import StudentHome from "./pages/student/StudentHome";
import StudentCourseDashboard from "./pages/student/modules/StudentCoursesDashboard"
import StudentCourses from "./pages/student/modules/StudentCourses";

export default function App() {
  return (
    <div>
      <Routes>
        {/* --- GENERAL --- */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/select-account-type"
          element={<SelectRegistrationPage />}
        />
        <Route path="/select-login-type/" element={<SelectLoginPage />} />

        {/* --- STUDENT --- */}
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/sign-up/" element={<RegistrationPage />} />
        <Route path="/student/home/" element={<StudentHome/> }/>
        <Route path="/student/dashboard/" element={<StudentCourseDashboard/>}/>
        <Route path="/student/your-courses/" element={<StudentCourses/>}/>

        {/* --- TEACHER --- */}
        <Route path="/sign-up-teacher/" element={<TeacherRegistrationPage />} />
        <Route path="/login-teacher/" element={<TeacherLoginPage />} />
        <Route path="/teacher/home/" element={<TeacherHome/>}/>
        <Route path="/teacher/create-course" element={<TeacherCreateCourse/>}/>
        <Route path="/teacher/dashboard" element={<TeacherCoursesDashboard/>}/>
        <Route path="/teacher/edit-course/:id" element={<TeacherEditCourse/>}/>
        <Route path="/teacher/association-request" element={<TeacherAssociationRequest/>}/>

        {/* --- UNIVERSITY --- */}
        <Route path="/sign-up-university/" element={<UniversityRegistrationPage />}/>
        <Route path="/login-university/" element={<UniversityLoginPage />} />
        <Route path="/university/home/" element={<UniversityHome/>}/>
        <Route path="/university/create-course" element={<UniversityCreateCourse/>}/>
        <Route path="/university/dashboard" element={<UniversityCourseDashboard/>}/>
        <Route path="/university/edit-course/:id" element={<UniversityEditCourse />}/>
        <Route path="/university/confirm-course-association" element={<UniversityConfirmAssociations/>}/>
        
      </Routes>
    </div>
  );
}
