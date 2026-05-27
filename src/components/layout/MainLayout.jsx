
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ theme, setTheme }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar 
          theme={theme} 
          setTheme={setTheme} 
          location={location}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className={`flex flex-col ${location.pathname.startsWith('/teams') ? 'p-6 md:p-0' : 'p-6 gap-6'} flex-1 min-h-0`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
