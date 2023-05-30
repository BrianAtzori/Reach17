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

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/select-account-type"
          element={<SelectRegistrationPage />}
        />
        <Route path="select-login-type" element={<SelectLoginPage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="sign-up/" element={<RegistrationPage />} />
        <Route path="sign-up-teacher" element={<TeacherRegistrationPage />} />
        <Route path="login-teacher" element={<TeacherLoginPage />} />
        <Route
          path="sign-up-university"
          element={<UniversityRegistrationPage />}
        />
        <Route path="login-university" element={<UniversityLoginPage />} />
      </Routes>
    </div>
  );
}
