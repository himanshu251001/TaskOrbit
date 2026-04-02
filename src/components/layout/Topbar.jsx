
import { Menu, Search as SearchIcon, Bell, LogOut, Users, X } from "lucide-react";
import ToggleButton from "../common/ToggleButton";
import { handleLogout } from "../../services/userService";
import Search from "../common/UserSearch";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { handleImpersonate, handleRevert } from "../../services/userService";

const Topbar = ({ theme, setTheme }) => {
  const { user, loading } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("Selected user for impersonation:", user);
  return (
    <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-4 border-b border-base-200 bg-base-100">

      {/* Left Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="btn btn-ghost btn-square lg:hidden md:hidden">
          <Menu size={20} />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">

        {/* Search */}
        <div className="form-control hidden sm:flex border border-gray-300 rounded-md px-3 py-1">
          <Search
            variant="input"
            icon={SearchIcon}
            title="Search"
            placeholder="Search..."
            onAction={(u) => setSelectedUser(u)}
          />
        </div>

        {/* Bell */}
        <button className="btn btn-ghost btn-circle">
          <Bell size={18} />
        </button>
         <ToggleButton theme={theme} setTheme={setTheme} />

        {!loading && user?.isAdmin && (
          <Search
            variant="button"
            icon={Users}
            title="Impersonate"
            placeholder="Search user to impersonate..."
            onAction={(u) => handleImpersonate(u.id, user)}
          />
        )}
        {!loading && user?.isImpersonation && (
          <button
            onClick={handleRevert}
            className="btn bg-base-100 btn-sm shadow-xs flex items-center gap-2 text-red-500 hover:bg-red-400 text-base-100/90 hover:text-white"
            title="Stop Impersonation">
            <X size={18} />
            <span className="hidden lg:inline">Stop Impersonation</span>
          </button>
        )}

        {!loading && !user?.isImpersonation && (
          <button
            onClick={handleLogout}
            className="btn bg-base-100 btn-sm shadow-xs flex items-center gap-2 text-error hover:bg-error  hover:text-base-100"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden lg:inline">Logout</span>
          </button>
        )}
      </div>


    </div>

  );
};


export default Topbar;
