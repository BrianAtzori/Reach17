import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SelectRegistrationPage from "./pages/SelectRegistrationPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-account-type" element={<SelectRegistrationPage />}/>
        <Route path="login/" element={<LoginPage />} />
        <Route path="sign-up/" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}
