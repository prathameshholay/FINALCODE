// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Students/studentLogin";
import Dashboard from "./components/Dashboard";
import Register from "./components/Students/studentRegister";
import ProfilePage from "./components/profiles/StudentProfilePage";
import SettingsPage from "./components/Settings/settingsPage";
import AdminDashboard from "./components/Admin_Files/AdminDashbaord";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
