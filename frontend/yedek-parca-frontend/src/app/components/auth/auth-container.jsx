"use client";
import { useState } from "react";
import SignInForm from "./SıgnInForm";
import SignUpForm from "./SignUpForm";
import TogglePanel from "./toggle-panel";
import FormInput from "./form-input";

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleMode = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <div className="relative w-[900px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex ">
        {/* Formlar (Sign In ve Sign Up) */}
        <div
          className={`flex w-full transition-transform duration-700 ease-in-out ${
            isSignIn ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* Sign In Form */}
          <div className="w-1/2 flex justify-center  m-12">
            {/* <SignInForm toggleMode={toggleMode} /> */}
          </div>

          {/* Sign Up Form */}
          <div className="w-1/2 flex items-start " style={{ alignItems: "flex-start"}}>
            <SignUpForm toggleMode={toggleMode} />
          </div>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute w-1/2 h-full transition-transform duration-700 ease-in-out ${
            isSignIn ? "right-0 translate-x-0" : "left-0 -translate-x-4/4"
          }`}
        >
          <TogglePanel isSignIn={isSignIn} toggleMode={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
