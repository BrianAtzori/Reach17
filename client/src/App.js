import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="sign-up/" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}
