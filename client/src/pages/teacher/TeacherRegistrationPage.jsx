import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newTeacherSignUp } from "../../services/teacher/external-calls";

export default function TeacherRegistrationPage() {
  const navigator = useNavigate();

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    degrees: "",
  });

  function sendRegistrationForm(event) {
    event.preventDefault();
    newTeacherSignUp(newTeacher);
    navigator("/");
  }

  const handleChange = (event) => {
    setNewTeacher({ ...newTeacher, [event.target.id]: event.target.value });
  };

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Registrazione Docenti
        </h1>
        <form
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
          onSubmit={sendRegistrationForm}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="firstName"
            >
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Inserisci il tuo nome"
              value={newTeacher.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="lastName"
            >
              Cognome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="surname"
              type="text"
              placeholder="Inserisci il tuo cognome"
              value={newTeacher.surname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Inserisci la tua email"
              value={newTeacher.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Inserisci la tua password"
              value={newTeacher.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="degrees"
            >
              Lauree e titoli
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="degrees"
              type=""
              placeholder="Scrivi in breve le tue lauree e i titoli conseguiti, insieme ad eventuali certificazioni"
              value={newTeacher.degrees}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <input
              className=" w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
              type="submit"
              value="Registrati"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
