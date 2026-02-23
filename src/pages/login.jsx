import React from "react";

function Login() {
  return (
    <div className="min-h-screen w-full  flex items-center justify-center p-4 md:p-2 ">

      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-xl w-[95%] h-[95vh] overflow-hidden">

        <div className=" md:flex md:w-1/2 lg:w-2/3 p-5 items-center justify-center ">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Login"
            className="w-full h-full "
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-100 flex items-center justify-center p-8 md:p-10">
          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center p-2">
              TaskOrbit
            </h2>
            <p className="text-gray-600 mb-6 font-medium ">
              Sign into your account
            </p>
            <form >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-medium text-sm text-gray-900 mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2  focus:ring-offset-1 placeholder:text-gray-400 focus:ring-gray-400"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-sm text-gray-900 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  autoComplete="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2  focus:ring-offset-1 placeholder:text-gray-400 focus:ring-gray-400"
                />
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md shadow-md hover:bg-gray-800 transition">
                LOGIN
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
              <p className="hover:underline cursor-pointer">
                Forgot password?
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Register here
                </span>
              </p>
            </div>

            <div className="text-center text-xs text-gray-500 mt-10">
              Terms of use. Privacy policy
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
