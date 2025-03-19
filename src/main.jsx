import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartContext, CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
