"use client"

const SignUpOverlay = () => {
    return (
        <div
            className="absolute top-0 left-1/2 w-1/2 h-full bg-gradient  text-black flex flex-col items-center justify-center ">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm mt-2">To keep connected with us please login with your personal info</p>
                <button className="mt-4 px-4 py-2 bg-white text-red-500 rounded"
                        onClick={() => setIsSignUp(false)}>Sign
                    In
                </button>
            </div>
        </div>
    )
}
export default SignUpOverlay;