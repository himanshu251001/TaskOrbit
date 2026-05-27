import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

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
import Signup from "./pages/Signup";
import CreateOrganization from "./pages/CreateOrganization";
import Forbidden from "./pages/Forbidden";
import Profile from "./pages/Profile";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div data-theme={theme}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/organization/create" element={<CreateOrganization />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserProvider><Outlet /></UserProvider>}>
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
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
