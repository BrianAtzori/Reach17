import React from "react";
import Reach17Logo from "../../assets/reach17-logo.png";
import { useState } from "react";
import { universityLogin } from "../../services/university/external-calls";
import { useNavigate } from "react-router-dom";

export default function TeacherLoginPage() {
  const [universityLoginValue, setUniversityLogin] = useState({
    email: "",
    password: "",
  });

  const navigator = useNavigate();

  const handleChange = (event) => {
    setUniversityLogin({
      ...universityLoginValue,
      [event.target.id]: event.target.value,
    });
  };

  function sendLoginForm(event) {
    event.preventDefault();

    if (
      universityLoginValue.email === "" ||
      universityLoginValue.password === ""
    ) {
      alert("Verifica i dati inseriti, alcuni campi sono vuoti!");
    } else {
      universityLogin(universityLoginValue);
      navigator("/university/home/");
    }
  }

  return (
    <div className="p-5 bg-gradient-to-t from-greensea via-jade to-emerald min-h-screen h-fit tablet:p-8">
      <form
        onSubmit={sendLoginForm}
        className="flex items-center flex-col justify-center shadow-xl bg-white rounded-lg p-5 max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-12"
      >
        <div className="text-center">
          <img
            src={Reach17Logo}
            alt="reach17_logo_obiettivi_onu"
            className="mx-auto"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-sm font-bold mb-2 desktop-4k:text-4xl font-montserrat"
            htmlFor="firstName"
          >
            E-Mail
          </label>
          <input
            className="font-montserrat shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Inserisci la tua mail"
            value={universityLoginValue.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 w-full ">
          <label
            className="block text-sm font-bold mb-2 desktop-4k:text-4xl font-montserrat"
            htmlFor="lastName"
          >
            Password
          </label>
          <input
            className="font-montserrat shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Inserisci la tua password"
            value={universityLoginValue.password}
            onChange={handleChange}
          />
        </div>
        <input
          className=" w-full border-2 bg-greensea mt-5 focus:outline-none focus:shadow-outline max-w-md desktop-4k:mt-20 rounded-md p-2 font-montserrat font-semibold text-white hover:bg-transparent hover:text-emerald hover:border-2 hover:border-solid desktop-4k:p-5 desktop-4k:rounded-2xl"
          type="submit"
          value="Login"
        ></input>
      </form>
    </div>
  );
}
