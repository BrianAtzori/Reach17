import React from "react";
import { Link } from "react-router-dom";
import MyImpactLogo from "../assets/myimpact-logo.svg";

export default function LandingPage() {
  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <div className="flex items-center justify-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <div className="text-center">
          <img
            src={MyImpactLogo}
            alt="my_impact_logo_obiettivi_onu"
            className="mx-auto"
          />
          <p className="desktop-l:text-2xl desktop-4k:text-5xl text-gray text-lg mb-8 font-lora">
            Benvenut* in My Impact 🌍
          </p>
          <p className="desktop-l:text-2xl desktop-4k:text-5xl text-gray text-lg mb-12 font-lora">
            La Web App dedicata agli studenti universitari e alla loro
            formazione nell'ambito dello sviluppo sostenibile 🤝🏻
          </p>
          <div className="flex justify-center gap-3 text-gray desktop-l:gap-5 desktop-4k:gap-8">
            <Link
              to="/login"
              className=" desktop-l:text-2xl desktop-4k:text-5xl font-montserrat bg-transparent border text-gray rounded-md py-2 px-4 hover:bg-white hover:text-jade"
            >
              Accedi
            </Link>
            <Link
              to="/select-account-type"
              className="desktop-l:text-2xl desktop-4k:text-5xl bg-white font-montserrat hover:text-white text-gray rounded-md py-2 px-4 mr-4 hover:bg-jade"
            >
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
