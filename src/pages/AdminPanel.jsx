// import React from 'react'
// import Footer from '../components/Footer/Footer'
// import GetAllUsers from '../components/GetAllUsers/GetAllUsers'
// import GetAllBooks from '../components/GetAllBooks/GetAllBooks'
// import AdminHeader from '../components/AdminHeader/AdminHeader'
// import Loans from '../components/Loans/Loans'
// const AdminPanel = () => {
//   return (
//     <div>
//       <AdminHeader />

//       <GetAllUsers />

//       <GetAllBooks />

//       <Loans />

//       <Footer />
//     </div>
//   )
// }

// export default AdminPanel


import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import GetAllUsers from '../components/GetAllUsers/GetAllUsers';
import GetAllBooks from '../components/GetAllBooks/GetAllBooks';
import Loans from '../components/Loans/Loans';
import Sidebar from '../components/Sidebar/Sidebar';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('GetAllBooks');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'GetAllUsers':
        return <GetAllUsers />;
      case 'Loans':
        return <Loans />;
      default:
        return <GetAllBooks />;
    }
  };

  return (
    <div className="admin-panel">
      {/* <AdminHeader /> */}
      <div className="admin-content">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="main-content">
          {renderComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;