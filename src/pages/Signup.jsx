import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { registerUser, signUpWithMicrosoft } from "../services/userService";
import { toast } from "react-hot-toast";
import signupImg from "../assets/signup.png";
import { CircleCheckBig } from "lucide-react"
import Input from "../components/Form/Input";
import Alert from "../components/common/Alert";

function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showOrgAlert, setShowOrgAlert] = useState(false);

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData) => {
    try {
      const res = await registerUser(formData);
      const response = await res?.json();

      if (res?.ok) {
        toast.success(response?.message);
        navigate("/login");

      } else {
        const errMsg = response?.message || "Failed to create account";
        if (errMsg.includes("No organization found with this email domain")) {
          const domain = formData.email.split("@")[1];
          setShowOrgAlert(true);
        }
        else {
          toast.error(errMsg);
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleMicrosoftSignup = async () => {
    try {
      await signUpWithMicrosoft();
    } catch (err) {
      toast.error(err?.message || "Failed to signup with Microsoft");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-sans">
      <Alert
        isOpen={showOrgAlert}
        onClose={() => setShowOrgAlert(false)}
        onConfirm={() => {
          setShowOrgAlert(false);
          navigate(`/organization/create`);
        }}
        message="Seems like your organization does not exist in TaskOrbit yet. Would you like to create one for your domain?"
      />

      <div className="flex flex-col md:flex-row flex-1 w-full rounded-2xl ">

        <div className="w-full md:w-2/3 bg-base-100 flex justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-[500px] flex flex-col items-center">
            <div className="w-full rounded-xl overflow-hidden bg-[#0F172A] shadow-2xl flex items-center justify-center transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src={signupImg}
                alt="Orchestrate Your Workflow"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>

            <h2 className="text-[#3B2FC9] text-2xl lg:text-3xl font-extrabold tracking-tight mt-8 mb-3 text-center">
              Orchestrate Your Workflow
            </h2>

            <p className="text-slate-500 max-w-sm text-center text-sm lg:text-base font-medium leading-relaxed">
              Experience a structured environment where complex tasks transform into seamless achievements.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-base-200 flex justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-sm flex flex-col justify-center">

            <div className="flex items-center gap-2 mb-4">
              <CircleCheckBig size={32} className="text-success" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                TaskOrbit
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm mb-4 font-medium">
              Join TaskOrbit and start organizing today.
            </p>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

                <Input
                  label="Full name"
                  name="name"
                  placeholder="John Doe"
                  required={true}
                />

                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  required={true}
                  rules={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  }}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required={true}
                  rules={{
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  }}
                />

                <button
                  type="submit"
                  className="w-full p-3 bg-[#3B2FC9] hover:bg-[#2A1FA7] text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all text-xs tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#3B2FC9] focus:ring-offset-2 cursor-pointer"
                >
                  CREATE ACCOUNT
                </button>
              </form>
            </FormProvider>

            <div className="relative my-4 flex items-center justify-center w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <span className="relative p-2  text-slate-400 text-xs font-bold uppercase tracking-wider">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleMicrosoftSignup}
              className="w-full p-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 font-semibold text-sm focus:outline-none cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className="w-5 h-5 flex-shrink-0">
                <path fill="#f25022" d="M0 0h11v11H0z" />
                <path fill="#7fba00" d="M12 0h11v11H12z" />
                <path fill="#00a4ef" d="M0 12h11v11H0z" />
                <path fill="#ffb900" d="M12 12h11v11H12z" />
              </svg>
              <span>Sign up with Microsoft</span>
            </button>

            <div className="text-center mt-2 text-sm text-slate-600 font-semibold w-full">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#3B2FC9] font-bold hover:underline ml-1 focus:outline-none cursor-pointer"
              >
                Log in
              </button>
            </div>

            <div className="text-center text-xs text-slate-400 mt-4 leading-relaxed max-w-xs mx-auto font-medium w-full">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#3B2FC9] hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-[#3B2FC9] hover:underline">Privacy Policy</a>.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
