// components/dashboard/ScheduleCard.jsx

import { useState, useEffect } from "react";
import Card from "../common/Card";
import { getUpcomingEvents } from "../../services/eventService";
import { getTasks } from "../../services/taskService";
import { useUser } from "../../context/UserContext";


const ScheduleCard = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      const [events, tasks] = await Promise.all([getUpcomingEvents(), getTasks({ assignedToId: user?.id, dueStartDate: new Date(), dueEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })]);
      const modifiedTasks = tasks ? tasks.map(task => {
        return { ...task, event_type: "TASK" }
      }) : [];
      const combinedData = [...events, ...modifiedTasks];
      const sortedData = combinedData.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  return (
    <Card title="Upcoming" >
      <div className="mt-4 flex flex-col gap-4">
        {data?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-base-content/60">No upcoming events</p>
          </div>
        ) : (
          data?.map((item) => (
            <ScheduleCard2 key={`${item.event_type}-${item.id}`} title={item.title} startTime={item.start_time} endTime={item.end_time} date={item.event_date || item.dueDate} />
          ))
        )}
      </div>
    </Card>
  );
};

export const ScheduleCard2 = ({ title, startTime, endTime, date }) => {
  const bgColors = [
    "bg-primary/10",
    "bg-secondary/10",
    "bg-accent/10",
    "bg-success/10",
    "bg-warning/10",
    "bg-error/10",
  ];

  return (
    <div className={`px-3 py-4 rounded-xl ${bgColors[Math.floor(Math.random() * bgColors.length)]} `}>
      <p className="font-semibold">{title}</p>
      <div className="flex gap-2">
        <p className="text-xs font-semibold text-base-content/80">
          {new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")}
          {startTime && endTime &&
            ` | ${new Date(startTime).toLocaleTimeString()} - ${new Date(
              endTime
            ).toLocaleTimeString()}`}
        </p>
      </div>
    </div>
  );
}

export default ScheduleCard;
