import React, { useEffect } from "react";
import { X, Calendar, Clock, MapPin, Users, Plus, ChevronRight } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../Form/Input";
import Select from "../Form/Select";
import TextArea from "../Form/TextArea";
import MultiSelect from "../Form/MultiSelect";
import { createEvent, getEventsType } from "../../services/eventService";
import { getOrgMembers } from "../../services/userService";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

export default function CreateEventModal({ isOpen, onClose, date, onSuccess }) {
  const methods = useForm({
    defaultValues: {
      title: "",
      type: "Meeting",
      location: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      participants: [],
    },
  });

  const { reset, getValues } = methods;
  const [eventTypes, setEventTypes] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await getEventsType();
        const members = await getOrgMembers();
        setEventTypes(res);
        setMembers(members);
      } catch (error) {
        toast.error("Failed to get Events Type");
      }
    };

    if (isOpen && eventTypes.length === 0) {
      getEvents();
    }
  }, [isOpen]); // Fetch event types when modal opens (if not already fetched)

  useEffect(() => {
    if (date && isOpen) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      reset({
        ...getValues(),
        date: formattedDate
      });
    }
  }, [date, isOpen, reset, getValues]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const res = await createEvent(data);
      toast.success("Event created successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-base-100 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-base-content mt-2">New Event</h2>
            <p className="text-xs md:text-sm font-medium text-base-content/50 mt-1">
              Define a new milestone or session for your team's schedule.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-base-200 text-base-content/30 hover:text-base-content transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-4 overflow-y-auto flex-1 custom-scrollbar">
          <FormProvider {...methods}>
            <form id="create-event-form" onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              {/* General Info */}
              <div className="flex flex-col gap-6">
                <Input
                  label="Event Title"
                  name="title"
                  placeholder="e.g. Q4 Strategy Workshop"
                  required={true}
                />

                <div className="flex flex-col md:flex-row gap-6">
                  <Select
                    label="Event Type"
                    name="type"
                    options={eventTypes}
                    required={true}
                  />
                  <Input
                    label="Location"
                    name="location"
                    placeholder="Room 402 or Zoom Link"
                    icon={<MapPin size={18} />}
                  />
                </div>
                <div className="flex flex-col gap-6 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Users size={16} />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-base-content">Participants</h3>
                  </div>

                  <MultiSelect
                    label="Add Participants"
                    name="participants"
                    options={members}
                  />
                </div>
              </div>

              {/* Schedule Section */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <Clock size={16} />
                  </div>
                  <h3 className="text-base font-black tracking-tight text-base-content">Schedule</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <Input label="Date" name="date" type="date" required={true} />
                  <Input label="Start Time" name="startTime" type="time" required={true} />
                  <Input label="End Time" name="endTime" type="time" required={true} />
                </div>
              </div>

              {/* Description Section at the bottom */}
              <div className="flex flex-col gap-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Briefly describe the objectives and agenda..."
                  rows={4}
                />
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 flex items-center justify-end gap-4 border-t border-base-200 bg-base-200/10 shrink-0">
          <button
            onClick={onClose}
            className="btn btn-ghost h-12 md:h-14 px-6 md:px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-base-content/50 hover:bg-base-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-event-form"
            className="btn btn-primary h-12 md:h-14 px-8 md:px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/30"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
