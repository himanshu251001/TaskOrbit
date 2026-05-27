import {
  LayoutDashboard,
  PanelsTopLeft,
  ClipboardList,
  Users,
  CalendarDays,
  Settings,
} from "lucide-react";
import SidebarItem from "../common/SidebarItem";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
    if (onClose) onClose();
  };

  const SidebarContent = () => (
    <>
      <h1 className="text-2xl font-bold my-4 text-center">TaskOrbit</h1>

      <ul className="menu gap-2 border-t-2 border-base-200 px-4 py-4">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" onClick={onClose} />
        <SidebarItem icon={PanelsTopLeft} label="Projects" to="/projects" onClick={onClose} />
        <SidebarItem icon={ClipboardList} label="Tasks" to="/tasks" onClick={onClose} />
        <SidebarItem icon={Users} label="Teams" to="/teams" onClick={onClose} />
        <SidebarItem icon={CalendarDays} label="Calendar" to="/calendar" onClick={onClose} />
      </ul>
      {!loading && user &&
        <div 
          className="mt-auto flex items-center gap-3 pt-4 p-2 border-t-2 border-base-200 cursor-pointer hover:bg-base-200 transition-colors mb-4 md:mb-0" 
          onClick={handleProfileClick}
        >
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
    </>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay/Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Mobile Sidebar (Slide-in from left) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-base-300 bg-base-100 pt-2 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end px-4">
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle mt-2">
            ✕
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col min-h-screen bg-base-100 border border-base-200 rounded pt-2">
        <SidebarContent />
      </aside>
    </>
  );
}
