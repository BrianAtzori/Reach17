import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newStudentSignUp } from "../../services/student/external-calls";
import { getAllUsersByCategoryWithoutAuth } from "../../services/utilities/external-calls";
import nextId from "react-id-generator";

export default function RegistrationPage() {
  useEffect(() => {
    setNewStudent({ ...newStudent, studentCode: generateStudentCode() });
    retrieveUniversities();
  }, []);

  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    university: "",
    studentCode: "",
  });

  const [universitiesList, setUniversitiesList] = useState([]);

  const navigator = useNavigate();

  const passwordCheck = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z\d@#$%^&+=]).{8,}$/
  );

  async function retrieveUniversities() {
    const universities = await getAllUsersByCategoryWithoutAuth("universities");
    setUniversitiesList(universities);
  }

  function generateStudentCode() {
    var newStudentCode = "";
    var characters = "8AB5CD1EF2GHIJKLM3N6OPQRS4TUVWXYZ79"; //Numeri da 1 a 9 e lettere da A a Z
    var length = 8;

    for (let i = 0; i < length; i++) {
      var index = Math.floor(Math.random() * characters.length);
      newStudentCode += characters.charAt(index);
    }

    return newStudentCode;
  }

  function sendRegistrationForm(event) {
    event.preventDefault();
    if (
      newStudent.name === "" ||
      newStudent.surname === "" ||
      newStudent.email === "" ||
      newStudent.password === "" ||
      newStudent.university === ""
    ) {
      alert("Verifica i dati inseriti, alcuni campi sono vuoti!");
    } else {
      if (passwordCheck.test(newStudent.password)) {
        newStudentSignUp(newStudent);
        navigator("/");
      } else {
        alert(
          "La password deve contenere almeno 8 caratteri e almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale tra @, #, $, %, ^, &, + e ="
        );
      }
    }
  }

  const handleChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.id]: event.target.value });
  };

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit">
      <div className="w-full tablet:w-2/3 desktop:w-2/3 desktop-l:w-3/5 desktop-4k:w-3/4 desktop-4k:text-4xl shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12">
        <h1 className="text-2xl font-bold mb-4 desktop-4k:text-4xl font-lora text-gray">
          Registrazione Studente
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
              value={newStudent.name}
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
              value={newStudent.surname}
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
              value={newStudent.email}
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
              value={newStudent.password}
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
              id="university"
              name="university"
              onChange={handleChange}
              value={newStudent.university}
            >
              <option value="">Seleziona il tuo Ateneo</option>
              {universitiesList.map((university) => {
                return (
                  <option key={nextId()} value={university._id}>
                    {university.universityName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center justify-center flex-col desktop-4k:mt-20 desktop-4k:gap-10">
            <span>Una volta registrat* il tuo numero di matricola sarà:</span>
            <span className="font-bold m-2 bg-emerald  text-white p-4 rounded-lg ">
              {newStudent.studentCode}
            </span>
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
