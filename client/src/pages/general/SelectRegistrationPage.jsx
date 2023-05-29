import React from "react";
import { Link } from "react-router-dom";
import IconStudent from "../../assets/icons/registration/student.svg";
import IconTeacher from "../../assets/icons/registration/teacher.svg";
import IconUniversity from "../../assets/icons/registration//university.svg";
import nextId from "react-id-generator";

export default function SelectRegistrationPage() {
  const registrationTypes = [
    {
      image: IconStudent,
      title: "Studente",
      description: "Registrazione per tutti gli studenti",
      link: "/sign-up",
      color: "bg-blue-500",
    },
    {
      image: IconTeacher,
      title: "Professori",
      description: "Registrazione per i docenti dei corsi",
      link: "/sign-up-teacher",
      color: "bg-green-500",
    },
    {
      image: IconUniversity,
      title: "Ateneo",
      description: "Registrazione per accademie, atenei e scuole",
      link: "",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex justify-center p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen tablet:p-8 items-center desktop:p-8">
      <div className="w-full flex justify-around flex-wrap p-8 gap-3 tablet:gap-10">
        {registrationTypes.map((data) => (
          <div key={nextId()} className="w-full tablet:w-2/5 desktop:w-1/3 desktop:h-1/2 desktop-l:w-1/5 desktop-4k:h-1/3 desktop-4k:w-1/4 desktop-4k:text-4xl flex items-center justify-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
            <div className="flex flex-col justify-around items-center gap-4 desktop-4k:gap-7">
              <img
                src={data.image}
                alt="registration_icon"
                className=" fill-jade w-1/2"
              />
              <h2 className=" font-semibold text-jade font-lora text-lg desktop-4k:text-5xl">
                {data.title}
              </h2>
              <p className="font-montserrat text-center">{data.description}</p>
              <Link to={data.link}>
                <button className="mt-4 bg-emerald rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl border-2">
                  Registrati
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
