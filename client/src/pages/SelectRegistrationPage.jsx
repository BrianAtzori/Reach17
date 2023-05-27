import React from "react";
import { Link } from "react-router-dom";

export default function SelectRegistrationPage() {
  const registrationData = [
    {
      emoji:"👩🏻‍🎓👨🏽‍🎓👨🏼‍🎓🧑🏾‍🎓",
      title: "Studente",
      description: "Registrazione per tutti gli studenti",
      link: "/sign-up",
      color: "bg-blue-500",
    },
    {
      emoji:"👩🏼‍🏫👨🏻‍🏫👨🏿‍🏫🧑🏽‍🏫",
      title: "Professore",
      description: "Registrazione per utenti di tipo B",
      link: "/registrazione/utenteB",
      color: "bg-green-500",
    },
    {
      emoji:"🏫🎓✏️📚",
      title: "Ateneo",
      description: "Registrazione per utenti di tipo C",
      link: "/registrazione/utenteC",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex justify-center p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <div className="w-full bg-gray flex justify-around flex-wrap p-8 gap-3">
        {registrationData.map((data) => (
          <div className="flex items-center justify-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
            <div className="flex flex-col justify-around items-center gap-4">
              <p className="text-4xl mb-4">{data.emoji}</p>
              <h2 className=" font-semibold text-jade font-lora">{data.title}</h2>
              <p>{data.description}</p>
              <Link to={data.link}> <button>Registrati</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
