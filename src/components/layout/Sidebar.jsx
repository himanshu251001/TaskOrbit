import {
  LayoutDashboard,
  PanelsTopLeft,
  Timer,
  Users,
  CalendarDays,
  Settings,
} from "lucide-react";
import SidebarItem from "../common/SidebarItem";
import { useUser } from "../../context/UserContext";

export default function Sidebar() {
  const { user, loading } = useUser();
  return (
    <aside className="hidden md:flex lg:flex flex-col min-h-screen bg-base-100 border border-base-200 rounded pt-2">
      <h1 className="text-2xl font-bold my-4 text-center">TaskOrbit</h1>

      <ul className="menu gap-2 border-t-2 border-base-200 px-4 py-4">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" end />
        <SidebarItem icon={PanelsTopLeft} label="Projects" to="/projects" />
        <SidebarItem icon={Timer} label="Tasks" to="/tasks" />
        <SidebarItem icon={Users} label="Teams" to="/teams" />
        <SidebarItem icon={CalendarDays} label="Calendar" to="/calendar" />
        <SidebarItem icon={Settings} label="Settings" to="/settings" />
      </ul>
      {!loading && user &&
        <div className="mt-auto flex items-center gap-3 pt-4 p-2 border-t-2 border-base-200 cursor-pointer hover:bg-base-200" onClick={() => console.log(user)}>
          <div className="avatar">
            <div className="w-10 rounded-full">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-base-content/60">{user.email}</p>
          </div>
        </div>
      }
    </aside>


  );
}
