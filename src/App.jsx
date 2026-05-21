import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

import "./App.css";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Project";
import Tasks from "./pages/Task";
import TaskDetail from "./pages/TaskDetail";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import Profile from "./pages/Profile";
import { UserProvider } from "./context/UserContext";

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div data-theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout theme={theme} setTheme={setTheme} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/projects" element={<Projects />} />
                {/* lazy load project details and create project pages */}
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/:projectId/edit" element={<CreateProject />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/:id" element={<TaskDetail />} />
                {/* lazy load task creation page */}
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forbidden" element={<Forbidden />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div >
  );
}
