import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import BookList from '../components/Booklist/Booklist'

const Books = () => {
  return (
    <div>
      <Header/>
      <BookList/>
      <Footer/>
    </div>
  )
}

export default Books