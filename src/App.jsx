import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Books from "./pages/Books";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BorrowPage from "./pages/BorrowPage";
import AdminPanel from "./pages/AdminPanel";
import AddBook from "./components/AddBook/AddBook";
import EditBook from "./components/EditBook/EditBook";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess/CheckoutSuccess";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/contactUs" element={<ContactUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/borrow/:id" element={<BorrowPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/add-book" element={<AddBook />} />
            <Route path="/admin/edit-book/:id" element={<EditBook />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/profile" element={<Profile />} />


          </Routes>
        </Router>
      </CartProvider>

    </div>

  );
}

export default App;
