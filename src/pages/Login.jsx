import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAccessToken } from "../services/auth";
import { useForm, FormProvider } from "react-hook-form";
import { loginWithMicrosoft } from "../services/userService";
import { toast } from "react-hot-toast";
import Input from "../components/Form/Input";
import Alert from "../components/common/Alert";

function Login() {
  const [error, setError] = useState("");
  const [showOrgAlert, setShowOrgAlert] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const auth = searchParams.get("auth");
    const message = searchParams.get("message");
    const org = searchParams.get("createOrganization");

    if (org === "true") {
      setShowOrgAlert(true);
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("auth");
    newParams.delete("message");
    newParams.delete("createOrganization");
    setSearchParams(newParams, { replace: true });
    if (auth && message && !org) {
      if (auth === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }

    }
  }, []);

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

  const handleMicrosoftLogin = async () => {
    try {
      await loginWithMicrosoft();
      navigate("/dashboard");
    }
    catch (err) {
      setError("Failed to login with Microsoft");
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

            <Alert
              isOpen={showOrgAlert}
              onClose={() => setShowOrgAlert(false)}
              onConfirm={() => {
                setShowOrgAlert(false);
                navigate("/organization/create");
              }}
              message="Seems like your organization does not exist in TaskOrbit yet. Would you like to create one for your domain?"
            />

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                />

                {error && (
                  <div className="text-error text-sm text-center">{error}</div>
                )}

                <button type="submit" className="btn btn-primary w-full shadow-md transition">
                  LOGIN
                </button>
              </form>
            </FormProvider>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <span className="relative px-3 bg-base-200 text-xs font-semibold text-base-content/50 uppercase">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="btn btn-outline w-full flex items-center justify-center gap-3 border-base-300 hover:bg-base-300 text-base-content transition shadow-sm font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23" className="w-5 h-5 flex-shrink-0">
                <path fill="#f25022" d="M0 0h11v11H0z" />
                <path fill="#7fba00" d="M12 0h11v11H12z" />
                <path fill="#00a4ef" d="M0 12h11v11H0z" />
                <path fill="#ffb900" d="M12 12h11v11H12z" />
              </svg>
              <span>Login with Microsoft</span>
            </button>

            <div className="text-center mt-6 text-sm text-base-content/70">
              <p className="hover:underline cursor-pointer">
                Forgot password?
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-primary hover:underline cursor-pointer"
                >
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
