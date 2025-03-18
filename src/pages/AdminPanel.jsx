import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import GetAllUsers from '../components/GetAllUsers/GetAllUsers'
import GetAllBooks from '../components/GetAllBooks/GetAllBooks'
const AdminPanel = () => {
  return (
    <div>
        <Header/>

        <GetAllUsers/>

        <GetAllBooks/>

        <Footer/>
    </div>
  )
}

export default AdminPanel