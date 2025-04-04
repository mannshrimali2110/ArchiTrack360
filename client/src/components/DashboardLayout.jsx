import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../css/DashboardLayout.css'; 

const DashboardLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-content">{children}</div>
            </div>
        </>
    );
};

export default DashboardLayout;
