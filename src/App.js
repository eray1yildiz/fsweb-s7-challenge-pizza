import React from "react";
import HomePage from "./components/HomePage";
import OrderForm from "./components/OrderForm";
import ConfirmPage from "./components/ConfirmPage";
import logo from "./images/logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>

          <Route path="/pizza" element={<OrderForm />}></Route>

          <Route path="/success" element={<ConfirmPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
