import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import "./App.css";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout theme={theme} setTheme={setTheme} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
