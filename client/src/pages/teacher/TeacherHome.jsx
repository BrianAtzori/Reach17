import React from "react";
import nextId from "react-id-generator";
import { Link } from "react-router-dom";

export default function TeacherHome() {
  const Functions = [
    {
      title: "I tuoi corsi",
      description:
        "Accedi a una dashboard dove visualizzare e modificare i tuoi corsi",
      link: "/teacher/dashboard",
    },
    {
      title: "Crea un corso",
      description: "La sezione dove potrai creare un nuovo corso",
      link: "/teacher/create-course",
    },
    {
      title: "Richiedi associazione corso",
      description:
        "Qui potrai richiedere ad un'università di erogare il tuo corso ",
      link: "/teacher/association-request",
    },
    {
      title: "Richieste associazione in attesa",
      description: "Visualizza tutte le tue richieste in attesa",
      link: "/teacher/pending-requests",
    },
  ];

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8">
      <div className="grid grid-cols-1 gap-5 desktop:grid-cols-3 p-5 desktop-4k:gap-10">
        {Functions.map((data) => {
          return (
            <div
              key={nextId()}
              className="justify-around w-full h-full desktop-4k:text-4xl flex flex-col items-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12"
            >
              <h1 className="font-semibold text-jade font-lora text-xl mb-10 desktop-4k:text-5xl uppercase text-center">
                {data.title}
              </h1>
              <p className="font-montserrat text-center">{data.description}</p>
              <Link to={data.link} className="w-1/2">
                <button className="w-full mt-4 bg-emerald rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl border-2">
                  Vai
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
