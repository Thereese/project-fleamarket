import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbars";
import { About } from "./components/Abouts";
import { Startpage } from "./components/Startpages";
import { Login } from "./components/Logins";
import { Register } from "./components/Registers";
import { Addmarket } from "./components/Addmarkets";
import { Marketlist } from "./components/MarketLists";
import { Footer } from "./components/Footers";
import { ConfirmedAdd } from "./components/ConfirmedAdds";
import { Logout } from "./components/Logouts";

export const App = () => {
  return (
    <div className="page-container">
      <BrowserRouter>
        <Navbar />
        <div className="box">
          <Routes>
            <Route path="/" element={<Startpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addmarket" element={<Addmarket />} />
            <Route path="/confirmedadd" element={<ConfirmedAdd />} />
            <Route path="/marketlist" element={<Marketlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
