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
import BorrowPage from "./pages/BorrowPage";
import AdminPanel from "./pages/AdminPanel";
import AddBook from "./components/AddBook/AddBook";
import EditBook from "./components/EditBook/EditBook";

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
          <Route path="/borrow/:id" element={<BorrowPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route path="/admin/edit-book/:id" element={<EditBook />} />


        </Routes>
      </Router>

    </div>

  );
}

export default App;
