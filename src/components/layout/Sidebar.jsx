import {
  LayoutDashboard,
  PanelsTopLeft,
  Timer,
  Users,
  CalendarDays,
  Settings,
} from "lucide-react";
import SidebarItem from "../common/SidebarItem";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex lg:flex flex-col min-h-screen bg-base-100 border border-base-200 rounded pt-2">
      <h1 className="text-2xl font-bold my-4 text-center">TaskOrbit</h1>

      <ul className="menu gap-2 border-t-2 border-base-200 px-4 py-4">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" end />
        <SidebarItem icon={PanelsTopLeft} label="Projects" to="/projects" />
        <SidebarItem icon={Timer} label="Tasks" to="/tasks" />
        <SidebarItem icon={Users} label="Teams" to="/teams" />
        <SidebarItem icon={CalendarDays} label="Calendar" to="/calendar" />
        <SidebarItem icon={Settings} label="Settings" to="/settings" />
      </ul>

      <div className="mt-auto flex items-center gap-3 pt-4 p-2 border-t-2 border-base-200">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/101" alt="profile" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">James P.</p>
          <p className="text-xs text-base-content/60">james@email.com</p>
        </div>
      </div>
    </aside>


  );
}
