import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveComponent }) => {
    return (
        <div className="sidebar">
            <img src="public/logo5.png" alt="Logo" width='100px' />
            <h3 style={{ marginBottom: '20px' }}>ADMIN panel</h3>
            <ul>
                <li onClick={() => setActiveComponent('GetAllBooks')}>Get All Books</li>
                <li onClick={() => setActiveComponent('GetAllUsers')}>Get All Users</li>
                <li onClick={() => setActiveComponent('Loans')}>Loans</li>
            </ul>
        </div>
    );
};

export default Sidebar;