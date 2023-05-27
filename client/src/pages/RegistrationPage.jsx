import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { newStudentSignUp } from "../services/student/external-calls";

//Magari si può semplificare l'HTML
//Redirect home page loggando o login?

export default function RegistrationPage() {
  
  // ---------- HOOKS  ----------

  useEffect(() => {
    setNewStudent({ ...newStudent, studentCode: generateStudentCode() });
  }, {});

  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    university: "",
    studentCode: "",
  });

  // ---------- UTILITIES  ----------

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

  // ---------- FUNCTIONS  ----------

  function sendRegistrationForm(event) {
    event.preventDefault();
    newStudentSignUp(newStudent);
  }

  const handleChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.id]: event.target.value });
  };

  // ---------- COMPONENT  ----------

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Registrazione</h1>
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={sendRegistrationForm}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
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
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="lastName">
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
            <label className="block text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-sm font-bold mb-2" htmlFor="password">
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
            <label className="block text-sm font-bold mb-2" htmlFor="country">
              Ateneo
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="university"
              name="university"
              onChange={handleChange}
            >
              <option value="">Seleziona il tuo Ateneo</option>
              <option value="Università di Torino">Università di Torino</option>
              <option value="Università di Roma">Università di Roma</option>
              <option value="Università di Varese">Università di Varese</option>
              {/* Altri paesi */}
            </select>
          </div>
          <div className="flex items-center justify-center flex-col">
            <span>Una volta registrat* il tuo numero di matricola sarà:</span>
            <span className="font-bold m-2 bg-emerald  text-white p-4 rounded-lg">
              {newStudent.studentCode}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input
              className=" w-full text-white bg-greensea mt-5 font-bold rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Registrati"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
