import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  HelpCircle,
  CalendarDays,
  LayoutList,
  Filter
} from "lucide-react";
import { useUser } from "../context/UserContext";
import CreateEventModal from "../components/calendar/CreateEventModal";
import { getAllEvents, getUpcomingEvents } from "../services/eventService";
import { getTasks } from "../services/taskService";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const colors = {
    primary: 'bg-indigo-500 shadow-sm shadow-indigo-500/50',
    success: 'bg-emerald-500 shadow-sm shadow-emerald-500/50',
    warning: 'bg-orange-500 shadow-sm shadow-orange-500/50',
    other: 'bg-lime-300 shadow-sm shadow-lime-200/50',
  };
  const { user } = useUser();

  const eventTypeColors = {
    MEETING: colors.primary,
    CONFERENCE: colors.primary,
    WEBINAR: colors.primary,
    SEMINAR: colors.primary,

    WORKSHOP: colors.success,
    TRAINING: colors.success,

    TASK: colors.warning,
  };


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Helper functions to get days in month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Previous month days to fill the first week
  const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const prevMonthFill = Array.from({ length: firstDayOfMonth }, (_, i) => prevMonthDays - firstDayOfMonth + i + 1);

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Next month days to fill only the remaining days of the last week
  const totalDaysSoFar = prevMonthFill.length + currentMonthDays.length;
  const daysNeededToCompleteWeek = (7 - (totalDaysSoFar % 7)) % 7;
  const nextMonthFill = Array.from({ length: daysNeededToCompleteWeek }, (_, i) => i + 1);

  const allDays = [
    ...prevMonthFill.map(d => ({ day: d, current: false })),
    ...currentMonthDays.map(d => ({ day: d, current: true })),
    ...nextMonthFill.map(d => ({ day: d, current: false }))
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchEvents();
      fetchUpcomingEvents();
    }

  }, [currentDate, user?.id]);

  const fetchEvents = async () => {
    try {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const eventData = await getAllEvents(month, year);
      const taskData = await getTasks({
        assignedToId: user?.id,
        dueStartDate: new Date(year, month, 1).toISOString(),
        dueEndDate: new Date(year, month + 1, 0).toISOString(),
      });
      const data = [...eventData, ...taskData.data];
      const formattedEvents = data.map(event => {
        if (!event?.event_type) {
          event.event_type = "TASK";
        }
        return {
          ...event,
          color: eventTypeColors[event.event_type?.toUpperCase() || 'TASK'] || colors.other,
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const data = await getUpcomingEvents();
      const response = await getTasks({ assignedToId: user?.id, dueStartDate: currentDate.toISOString(), dueEndDate: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() });
      const tasks = response.data.map(task => ({
        ...task,
        title: task.title,
        event_date: task.dueDate,
        event_type: "TASK",
      }));
      setUpcomingEvents([...data, ...tasks].map(event => ({
        ...event,
        color: eventTypeColors[event.event_type?.toUpperCase()] || colors.other,
      })));

    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
      {/* Calendar Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-base-200">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold tracking-tight text-base-content">Events</h1>
          <div className="flex items-center gap-3 bg-base-200/50 p-1 rounded-xl border border-base-200">
            <button onClick={handlePrevMonth} className="btn btn-ghost btn-xs btn-circle hover:bg-base-100 shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-sm font-bold min-w-[120px] text-center uppercase tracking-widest text-base-content/70">
              {monthNames[currentDate.getMonth()]} <span className="text-base-content/30">{currentDate.getFullYear()}</span>
            </h2>
            <button onClick={handleNextMonth} className="btn btn-ghost btn-xs btn-circle hover:bg-base-100 shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"><Filter size={18} className="text-base-content/60" /></button>
          <button className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"><Settings size={18} className="text-base-content/60" /></button>
          <button className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"><HelpCircle size={18} className="text-base-content/60" /></button>
        </div> */}
      </header>

      <div className="flex flex-col lg:flex-row flex-1 ">
        {/* Main Calendar Section */}
        <div className=" flex flex-col p-8 overflow-auto custom-scrollbar lg:flex-1">
          <div className="flex flex-col border border-base-200 rounded-2xl bg-base-100 shadow-inner min-w-[400px]">
            {/* Days of Week Header */}
            <div className="flex border-b border-base-200 bg-base-200/20 backdrop-blur-sm">
              {daysOfWeek.map(day => (
                <div key={day} className="flex-1 py-4 text-center text-[11px] font-black tracking-[0.2em] text-base-content/40 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar  using Flexbox */}
            <div className="flex flex-wrap">

              {allDays.map((dateObj, idx) => {
                const dayEvents = dateObj.current ? events.filter(e => new Date(e.event_date || e.dueDate).getDate() === Number(dateObj.day)) : []
                const isSelected = dateObj.current &&
                  selectedDate &&
                  selectedDate.getDate() === dateObj.day &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getFullYear() === currentDate.getFullYear();
                const isToday = dateObj.current && dateObj.day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

                return (
                  <div
                    key={idx}
                    className={`w-[14.285%] min-h-[110px] border-r border-b border-base-300 p-3 flex flex-col gap-2 transition-all duration-200 hover:bg-primary/5 cursor-pointer relative group
                      ${idx % 7 === 6 ? 'border-r-0' : ''}
                      ${!dateObj.current ? 'bg-base-200/5 opacity-40' : ''}
                    `}
                    onClick={() => {
                      if (dateObj.current) {

                        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), dateObj.day));
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <div className="flex justify-end relative">
                      <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300
                        ${!dateObj.current ? 'text-base-content/20' : 'text-base-content/60'}
                        ${isSelected ? 'bg-primary text-primary-content shadow-lg shadow-primary/30 scale-110 -translate-y-1' : 'group-hover:text-primary'}
                        ${isToday && !isSelected ? 'border-2 border-primary text-primary' : ''}
                      `}>
                        {dateObj.day}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 mt-auto pb-1 overflow-hidden">
                      {dayEvents.map((event, eIdx) => (
                        <div
                          key={eIdx}
                          className={`text-[10px] px-2 py-0.5 rounded-md border truncate text-base-100 font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-95
                            ${event.color}
                            ${event.isPrimary ? 'shadow-primary/20' : 'border-transparent'}
                          `}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Legend */}
          <div className="flex flex-wrap items-center gap-8 mt-8 px-2">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${colors.primary}`}></div>
              <span className="text-[11px] font-black uppercase tracking-wider text-base-content/40">Meetings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${colors.success}`}></div>
              <span className="text-[11px] font-black uppercase tracking-wider text-base-content/40">Workshops</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${colors.warning}`}></div>
              <span className="text-[11px] font-black uppercase tracking-wider text-base-content/40">Tasks</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${colors.other}`}></div>
              <span className="text-[11px] font-black uppercase tracking-wider text-base-content/40">Other</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Upcoming Events */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-base-200 bg-base-200/10 flex flex-col p-8 overflow-y-auto backdrop-blur-md sm:flex-1 lg:flex-none">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black tracking-tight text-base-content">Key Dates</h3>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex gap-5 group cursor-pointer hover:translate-x-1 transition-transform duration-300">
                <div className={`w-1.5 rounded-full shrink-0 shadow-lg ${event.color}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-bold text-base-content truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center justify-between gap-3">
                      {event.event_date && (
                        <span className="text-[10px] font-bold text-base-content/60 uppercase tracking-[0.2em] bg-base-200 px-2 py-0.5 rounded border border-base-300/30">
                          {new Date(event.event_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short'
                          }).toUpperCase()}
                        </span>
                      )}
                      {event?.start_time && event?.end_time && (
                        <p className="text-[10px] text-base-content/40 font-bold tracking-widest uppercase">{event.start_time.split('T')[1].slice(0, 5)} - {event.end_time.split('T')[1].slice(0, 5)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-10 flex flex-col gap-4 relative">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-base-100 hover:bg-base-200 text-base-content border-base-300 rounded-2xl normal-case flex items-center justify-center gap-3 h-14 shadow-sm transition-all hover:shadow-md group"
            >
              <CalendarDays size={20} className="text-base-content/30 group-hover:text-primary transition-colors" />
              <span className="text-sm font-black uppercase tracking-widest">Create Event</span>
            </button>
          </div>
        </div>
      </div>
      <CreateEventModal
        date={selectedDate}
        isOpen={isModalOpen}
        onSuccess={() => {
          fetchEvents();
          fetchUpcomingEvents();
        }}
        onClose={() => {
          setSelectedDate(null);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

