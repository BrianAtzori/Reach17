import React from "react";
import MyImpactLogo from "../assets/myimpact-logo.svg";

export default function LandingPage() {
  return (
    <div className="p-5">
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src={MyImpactLogo} alt="my_impact_logo_obiettivi_onu" className="mx-auto"/>
        <p className="text-gray text-lg mb-8">
          Benvenuto nella nostra webapp dedicata agli obiettivi di sviluppo sostenibile delle Nazioni Unite.
        </p>
        <div className="flex justify-center gap-3 text-gray">
          <button className="bg-transparent border text-gray rounded-md py-2 px-4 hover:bg-white hover:text-jade hover:animate-bounce" >
            Accedi
          </button>
          <button className="bg-white hover:text-white text-gray rounded-md py-2 px-4 mr-4 hover:bg-jade hover:animate-bounce">
            Registrati
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
