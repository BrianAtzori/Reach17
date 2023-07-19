import React from "react";
import Reach17Logo from "../assets/reach17-logo.png";

export default function EmptyComponent({ message }) {
  return (
    <div className="mt-10 p-20 justify-around w-full h-full desktop-4k:text-4xl flex flex-col items-center shadow-xl bg-white rounded-lg max-w-md mx-auto desktop-4k:max-w-6xl desktop-4k:rounded-2xl desktop-4k:p-40">
      <img
        src={Reach17Logo}
        alt="reach17_logo_obiettivi_onu"
        className="mx-auto"
      />
      <h1 className="font-semibold text-jade font-montserrat text-xl desktop-4k:text-5xl uppercase text-center">
        {message}
      </h1>
    </div>
  );
}
