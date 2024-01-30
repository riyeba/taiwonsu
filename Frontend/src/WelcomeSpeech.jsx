import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomeSpeech() {
  const navigate = useNavigate();
  function goform() {
    navigate("/register");
  }
  return (
    <div className="h-screen">
      <div className="mt-24 px-16 flex justify-between flex-col sm:flex-row ">
        <div>
          <h1 className="sm:text-[2.3rem] font-serif text-xl">
            <p>GET REGISTERED.</p>
          </h1>
          <div className="mt-3">
            <p className="text-xs sm:text-xl">
              Tailored specifically for students, XYZ app simplifies the process
              of registering <br /> and monitoring students information.
            </p>
          </div>
          <button
            className="border bg-gray-700 px-10 py-2 text-white text-[1rem] mt-7"
            onClick={goform}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSpeech;
