import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-page">
      {/* Overlay optional for darkening background */}
      <div className="overlay"></div>

      <header className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/pages">Pages</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/blog">Blog</Link>
      </header>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
      </div>

      <main className="main-content">
        <h1>Training and Placement Portal</h1>
        <div className="card-container">
          <Link to="/register/student" className="card">Student</Link>
          <Link to="/admin/dashboard" className="card">Admin Dashboard</Link> {/* REPLACED */}
          <Link to="/register/tpo" className="card">TPO</Link>
          <Link to="/register/company" className="card">Company</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
