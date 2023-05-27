import React from "react";

export default function SelectRegistrationPage() {
  const registrationData = [
    {
      title: "Studente",
      description: "Registrazione per utenti di tipo A",
      link: "/sign-up",
      color: "bg-blue-500",
    },
    {
      title: "Professore",
      description: "Registrazione per utenti di tipo B",
      link: "/registrazione/utenteB",
      color: "bg-green-500",
    },
    {
      title: "Ateneo",
      description: "Registrazione per utenti di tipo C",
      link: "/registrazione/utenteC",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <div className="flex justify-center">
        {registrationData.map((data, index) => (
          <a
            key={index}
            href={data.link}
            className={`w-64 m-4 p-6 text-center rounded-lg text-jade ${data.color}`}
          >
            <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
            <p>{data.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
