
import { Menu, Search, Bell } from "lucide-react";
import ToggleButton from "../common/ToggleButton";

const Topbar = ({ theme, setTheme }) => {
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
        <div className="form-control hidden sm:flex">
          <div className="input input-bordered flex items-center gap-2">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search"
              className="grow focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Bell */}
        <button className="btn btn-ghost btn-circle">
          <Bell size={18} />
        </button>

        {/* Theme Toggle */}
        <ToggleButton theme={theme} setTheme={setTheme} />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://i.pravatar.cc/100" alt="avatar" />
            </div>
          </div>

          <div className="text-sm hidden md:block">
            <p className="font-medium">James</p>
            <p className="text-xs text-base-content/60">ID: 4827682</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Topbar;
