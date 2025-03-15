import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import Value from '../components/Value/Value'
import Residencies from '../components/Residencies/Residencies'
import GetStarted from '../components/GetStarted/GetStarted'
const Home = () => {
  return (
    <div>
        <Header/>
        <Hero/> 
        <Residencies/> 
        <Value/>    
        <GetStarted/>
        <Footer/>
    </div>
  )
}

export default Home