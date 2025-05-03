// src/components/Dashboard.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../css/DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
