import React from "react";
import { useState } from "react";
import { createCourse } from "../../../services/university/external-calls";
import { useNavigate } from "react-router-dom";

export default function UniversityCreateCourse() {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    universities: "",
    status: "",
    hours: "",
    type: "",
  });

  const navigator = useNavigate();

  function sendRegistrationForm(event) {
    event.preventDefault();
    createCourse(newCourse);
    navigator("/university/dashboard");
  }

  const handleChange = (event) => {
    setNewCourse({ ...newCourse, [event.target.id]: event.target.value });
  };

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald h-screen">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Creazione corsi
        </h1>
        <form
          className="pt-6 mb-4 items-start font-montserrat text-gray w-full"
          onSubmit={sendRegistrationForm}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="title"
            >
              Titolo del corso
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Inserisci il titolo del tuo nuovo corso"
              value={newCourse.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="description"
            >
              Descrizione del corso
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Elenca in breve gli argomenti trattati all'interno del corso"
              value={newCourse.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="University"
            >
              Ateneo
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="universities"
              name="universties"
              onChange={handleChange}
            >
              <option value="">
               DA FARE GET DELL'UNI PER CREARLA DI DEFAULT
              </option>
              <option value="Università di Torino">Università di Torino</option>
              <option value="Università di Roma">Università di Roma</option>
              <option value="Università di Varese">Università di Varese</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="Teacher"
            >
              Insegnante
            </label>
          <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="teacher"
              name="teacher"
              onChange={handleChange}
            >
              <option value="">
               DA FARE GET DEI TEACHER PER SELEZIONARLO
              </option>
              <option value="Alfredo">Alfredo</option>
              <option value="Marco">Marco</option>
              <option value="Gino">Gino</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="hours"
            >
              Numero ore corso
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="hours"
              type="number"
              placeholder="Inserisci il numero di ore del tuo corso"
              value={newCourse.hours}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 desktop-4k:text-4xl"
              htmlFor="type"
            >
              Tipologia di corso
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              onChange={handleChange}
            >
              <option value="">Seleziona la tipologia di corso</option>
              <option value="Teorico">Teorico</option>
              <option value="Pratico">Pratico</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <input
              className=" w-full border-2 text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline max-w-md desktop-4k:p-4 desktop-4k:rounded-xl desktop-4k:mt-20 hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid"
              type="submit"
              value="Aggiungi corso"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
