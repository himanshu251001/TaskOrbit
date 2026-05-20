import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Info,
  Phone,
  Briefcase,
  Calendar,
  Lock,
  Edit3,
  ShieldCheck,
  X
} from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useUser } from "../context/UserContext";
import Input from "../components/Form/Input";
import TextArea from "../components/Form/TextArea";
import PhoneInput from "../components/Form/PhoneInput";
import LocationSelect from "../components/Form/LocationSelect";
import { updateUserProfile, handleLogout } from "../services/userService";
import { toast } from "react-hot-toast";

export default function Profile() {
  const { user, loading, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    values: {
      fullName: user?.name || "",
      phoneNumber: user?.phoneNumber || null,
      designation: user?.designation || null,
      location: user?.location || null,
      bio: user?.bio || null,
      dob: user?.dateOfBirth?.split("T")[0] || null,
      password: "",
      confirmPassword: ""
    }
  });

  const watchedDesignation = methods.watch("designation");
  const watchedLocation = methods.watch("location");
  const watchedBio = methods.watch("bio");


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const onSubmit = async (data) => {
    // Password match check before sending
    if (data.password && data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        return toast.error("Passwords do not match");
      }
    }

    try {
      // Mapping form fields to backend payload structure
      const payload = {
        name: data.fullName,
        phoneNumber: data.phoneNumber,
        designation: data.designation,
        location: data.location,
        bio: data.bio,
        dateOfBirth: data.dob,
      };

      // Only send password if it's not empty
      if (data.password) {
        payload.password = data.password;
        const res = await updateUserProfile(user?.id, payload);
        toast.success("Profile updated successfully");
        setIsEditing(false);
        handleLogout();

      }

      const res = await updateUserProfile(user?.id, payload);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      if (refreshUser) refreshUser(); // Refresh global user context
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Card - Profile Summary */}
        <div className="w-full lg:w-1/3 bg-base-100 rounded-lg border border-base-200 shadow-sm p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center text-primary text-5xl font-black border-4 border-base-100 shadow-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

          </div>

          <h2 className="sm:text-2xl text-xl font-black text-base-content mb-1 text-center">{user?.name}</h2>
          <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-8 text-center">
            {watchedDesignation || "-"}
          </p>

          <div className="w-full h-px bg-base-200 mb-8"></div>

          <div className="w-full flex flex-col gap-6">
            <InfoItem icon={<Mail size={18} />} label="Email Address" value={user?.email || "-"} />
            <InfoItem icon={<MapPin size={18} />} label="Location" value={watchedLocation || "-"} />
            <InfoItem icon={<Info size={18} />} label="Bio" value={watchedBio || "-"} />
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-8">
          {/* Combined Form Card */}
          <div className="bg-base-100 rounded-lg border border-base-200 shadow-sm p-10">
            <div className="flex items-center flex-wrap justify-between mb-8 sm:gap-0 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <h3 className="text-xl font-black text-base-content tracking-tight">Personal Information</h3>
              </div>
              <div className="flex items-center gap-2">
                {isEditing && (
                  <button
                    onClick={methods.handleSubmit(onSubmit)}
                    className="btn btn-primary btn-sm normal-case font-bold px-6 shadow-lg shadow-primary/20"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => {
                    if (isEditing) methods.reset(); // Reset form if closing
                    setIsEditing(!isEditing);
                  }}
                  className={`btn btn-sm normal-case font-bold gap-2 ${isEditing
                    ? 'btn-ghost text-error hover:bg-error/5'
                    : 'btn-ghost text-primary hover:bg-primary/5'
                    }`}
                >
                  {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                  {isEditing ? "Close" : "Edit Profile"}
                </button>
              </div>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <Input label="Full Name" name="fullName" placeholder={isEditing ? "Your Name" : "-"} disabled={!isEditing} />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <PhoneInput label="Phone Number" name="phoneNumber" placeholder={isEditing ? "+1 (000) 000-0000" : "-"} disabled={!isEditing} />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <Input label="Designation" name="designation" placeholder={isEditing ? "e.g. Lead Designer" : ""} icon={<Briefcase size={18} />} disabled={!isEditing} />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <LocationSelect label="Location" name="location" placeholder={isEditing ? "Search City, Country..." : ""} icon={<MapPin size={18} />} disabled={!isEditing} />
                </div>
                <div className="w-full px-4 mb-6">
                  <TextArea label="Bio" name="bio" placeholder={isEditing ? "Tell us about yourself..." : ""} rows={4} disabled={!isEditing} />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <Input label="Date of Birth" name="dob" type="date" placeholder={isEditing ? "Select your birth date" : ""} icon={<Calendar size={18} />} disabled={!isEditing} />
                </div>

                {/* Security Section Divider */}
                <div className="w-full border-t-2 border-base-300 my-6"></div>

                <div className="w-full px-4 flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-xl font-black text-base-content tracking-tight">Security</h3>
                </div>

                <div className="w-full md:w-1/2 px-4 mb-6">
                  <Input label="New Password" name="password" type="password" placeholder="••••••••" icon={<Lock size={18} />} disabled={!isEditing} />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" icon={<Lock size={18} />} disabled={!isEditing} />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-base-content">{icon}</div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-bold text-base-content/50 tracking-[0.2em]">{label}</span>
        <p className="text-sm font-semibold text-base-content break-words leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
