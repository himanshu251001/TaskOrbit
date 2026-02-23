import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex gap-3 rounded-md px-8 py-3 text-sm font-medium transition-all ${
            isActive
              ? "bg-primary text-primary-content"
              : "hover:bg-base-200 hover:text-base-content"
          }`
        }
      >
        <Icon size={18} />
        {label}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
