import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import {
  FaUserGraduate,
  FaBuilding,
  FaClipboardList,
  FaKey,
  FaChartLine,
  FaUsersCog,
} from "react-icons/fa";

const StatCard = ({ title, count, icon }) => (
  <div className={styles.statCard}>
    <div className={styles.icon}>{icon}</div>
    <div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCount}>{count}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatCard title="Total Students" count={1087} icon={<FaUserGraduate />} />
        <StatCard title="Companies Registered" count={92} icon={<FaBuilding />} />
        <StatCard title="Upcoming Drives" count={14} icon={<FaClipboardList />} />
      </div>

      <div className={styles.sectionGrid}>
        <div className={styles.section}>
          <h2>🎓 Student Management</h2>
          <Link to="/admin/students" className={styles.btn}>Manage Students</Link>
          <Link to="/admin/students/export" className={styles.btn}>Export Data</Link>
        </div>

        <div className={styles.section}>
          <h2>🏢 Company Management</h2>
          <Link to="/admin/companies" className={styles.btn}>View Companies</Link>
          <Link to="/admin/companies/approval" className={styles.btn}>Approve Companies</Link>
        </div>

        <div className={styles.section}>
          <h2>📅 Placement Drives</h2>
          <Link to="/admin/drives" className={styles.btn}>Manage Drives</Link>
          <Link to="/admin/drives/create" className={styles.btn}>Add New Drive</Link>
        </div>

        <div className={styles.section}>
          <h2>🔧 Admin Tools</h2>
          <Link to="/admin/logs" className={styles.btn}>System Logs</Link>
          <Link to="/admin/reset-password" className={styles.btn}>Reset Passwords</Link>
          <Link to="/admin/roles" className={styles.btn}>Manage Roles</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
