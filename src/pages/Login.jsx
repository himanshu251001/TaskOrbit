import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../services/auth";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { refreshUser } = useUser();

  const onSubmit = async (formData) => {
    setError("");
    const apiUrl = import.meta.env.VITE_API_URL || "localhost:3000";

    try {
      const res = await fetch(`http://${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json().catch(() => null);
      if (res.ok) {
        let token = data?.accessToken || null;
        if (token) {
          setAccessToken(token);
        }
        await refreshUser();
        reset();
        navigate("/dashboard");
      } else {
        const message = data?.message || "Login failed";
        setError(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    }
  };
  return (
    <div className="min-h-screen w-full  flex items-center justify-center p-4 md:p-2 bg-base-100 ">

      <div className="flex flex-col flex-1 md:flex-row rounded-2xl  shadow-xl w-[95%] ">

        <div className=" md:flex md:w-1/2 lg:w-2/3 p-5 items-center justify-center rounded-t-2xl md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Login"
            className="w-full h-full "
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 bg-base-200 flex rounded-b-2xl md:rounded-b-none md:rounded-tr-2xl md:rounded-br-2xl  items-center justify-center p-8 md:p-10">
          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-base-content mb-4 text-center p-2">
              TaskOrbit
            </h2>
            <p className="text-base-content/70 mb-6 font-medium ">
              Sign into your account
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-medium text-sm text-base-content mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-base-content/50 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-medium text-sm text-base-content mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-base-content/50 focus:ring-primary"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <div className="mb-4 text-error text-sm text-center">{error}</div>
              )}

              <button type="submit" className="btn btn-primary w-full shadow-md transition">
                LOGIN
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-base-content/70">
              <p className="hover:underline cursor-pointer">
                Forgot password?
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Register here
                </span>
              </p>
            </div>

            <div className="text-center text-xs text-base-content/50 mt-10">
              Terms of use. Privacy policy
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
