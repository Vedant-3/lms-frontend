import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Companies from "./components/Companies/Companies"
import Residencies from "./components/Residencies/Residencies";
import Value from "./components/Value/Value"
import Contact from "./components/Contact/Contact";
import GetStarted from "./components/GetStarted/GetStarted";
import Footer from "./components/Footer/Footer";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      {/* <div className="Start">
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div> */}
      {/* <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
      <Footer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>

    </div>

  );
}

export default App;
