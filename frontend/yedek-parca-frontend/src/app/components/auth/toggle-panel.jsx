"use client";
import { Button } from "primereact/button";

const TogglePanel = ({ isSignIn, toggleMode }) => {
  return (
    <div
      className={`absolute top-0 w-full h-full flex flex-col items-center justify-center text-white px-18 text-center transition-transform duration-700 ease-in-out ${
        isSignIn ? "bg-red-500 translate-x-0" : "bg-red-500 translate-x-full"
      }`}
    >
      {isSignIn ? (
        <>
          <h2 className="text-2xl font-bold">Hello, Friend!</h2>
          <p className="text-center text-sm my-2">
            Enter your personal details and start your journey with us
          </p>
          <Button
            label="SIGN UP"
            className="mt-4 border-white text-white text-lg px-6 py-3 rounded-md hover:bg-white hover:text-red-500"
            onClick={toggleMode}
          />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-center text-sm my-2">
            To keep connected with us please login with your personal info
          </p>
          <Button
            label="SIGN IN"
            className="mt-4 border-white text-white text-lg px-6 py-3 rounded-md hover:bg-white hover:text-red-500"
            onClick={toggleMode}
          />
        </>
      )}
    </div>
  );
};

export default TogglePanel;
