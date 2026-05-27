import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Building2, Globe, ArrowLeft, Sparkles, ShieldCheck, CircleCheckBig } from "lucide-react";
import Input from "../components/Form/Input";
import { toast } from "react-hot-toast";
import { registerOrg } from "../services/userService";

function CreateOrganization() {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData) => {
    const res = await registerOrg(formData)
    const resposne = await res.json()
    if (res?.ok) {
      toast.success(resposne?.message)
      navigate("/signup")
    }
    else {
      toast.error(resposne?.message)
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">

      {/* Left Side */}
      <div className="h-1/2 md:h-auto md:w-2/3 flex bg-neutral text-neutral-content flex-col justify-center items-center p-10 overflow-auto">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 mb-6">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">Enterprise Onboarding</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Establish your digital headquarters.
          </h2>

          <p className="text-neutral-content/70 text-sm leading-relaxed mb-8">
            Set up a secure, shared space where team collaboration flourishes. Defining your workspace domain automates member onboarding and unifies task orchestration under one roof.
          </p>

          <div className="space-y-4 w-full">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-primary/20 text-primary">
                <Globe size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Automatic Member Onboarding</h4>
                <p className="text-neutral-content/60 text-xs mt-0.5">Anyone signing up with an @yourcompany.com email is automatically linked to your team space.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-primary/20 text-primary">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Secure Domain Boundaries</h4>
                <p className="text-neutral-content/60 text-xs mt-0.5">Isolated, enterprise-grade workspaces ensure that only recognized domain users gain access.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="h-1/2 md:h-auto md:w-1/3 bg-base-200 flex items-center justify-center p-8 overflow-auto">
        <div className="max-w-sm w-full">

          <div className="flex items-center gap-2 mb-4">
            <CircleCheckBig size={32} className="text-success" />
            <h2 className="text-3xl font-bold text-base-content">
              TaskOrbit
            </h2>
          </div>

          <p className="text-base-content/70 mb-6 font-medium">
            Create a new organization to get started.
          </p>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <Input
                label="Organization Name"
                name="name"
                placeholder="e.g. Acme Corporation"
                required={true}
                icon={<Building2 size={18} />}
                rules={{
                  minLength: {
                    value: 2,
                    message: "Organization name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Organization name cannot exceed 100 characters",
                  }
                }}
              />

              <Input
                label="Business Domain"
                name="domain"
                placeholder="e.g. acme.com"
                required={true}
                icon={<Globe size={18} />}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid domain name (e.g. company.com)",
                  }
                }}
              />

              <button type="submit" className="btn btn-primary w-full">
                CREATE WORKSPACE
              </button>
            </form>
          </FormProvider>

          <div className="text-center mt-6">
            <p
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer"
            >
              <ArrowLeft size={16} />
              Return to Login
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CreateOrganization;
