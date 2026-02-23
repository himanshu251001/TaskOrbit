
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ theme, setTheme }) {
  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar theme={theme} setTheme={setTheme} />

        <main className="p-6 flex flex-col gap-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
