"use client";

const AuthOverlay = ({ isSignUp, setIsSignUp }) => {
  return (
    <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-pink-500 to-red-500 text-white flex flex-col items-center justify-center transition-all duration-500">
      {isSignUp ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm mt-2">To keep connected with us please login with your personal info</p>
          <button className="mt-4 px-4 py-2 bg-white text-pink-500 rounded" onClick={() => setIsSignUp(false)}>Sign In</button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Hello, Friend!</h1>
          <p className="text-sm mt-2">Enter your personal details and start your journey with us</p>
          <button className="mt-4 px-4 py-2 bg-white text-pink-500 rounded" onClick={() => setIsSignUp(true)}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default AuthOverlay;
