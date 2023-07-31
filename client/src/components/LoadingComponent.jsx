import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-greensea border-solid h-20 w-20 desktop:h-40 desktop:w-40 desktop-4k:h-80 desktop-4k:w-80 bg-white"></div>
    </div>
  );
}
