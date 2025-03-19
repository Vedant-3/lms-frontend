import React from 'react'
import Footer from '../components/Footer/Footer'
import GetAllUsers from '../components/GetAllUsers/GetAllUsers'
import GetAllBooks from '../components/GetAllBooks/GetAllBooks'
import AdminHeader from '../components/AdminHeader/AdminHeader'
import Loans from '../components/Loans/Loans'
const AdminPanel = () => {
  return (
    <div>
      <AdminHeader />

      <GetAllUsers />

      <GetAllBooks />

      <Loans />

      <Footer />
    </div>
  )
}

export default AdminPanel