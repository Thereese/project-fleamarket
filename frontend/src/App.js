import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "components/Navbar";
import Sidebar from "components/Sidebar";
import { About } from "components/About";
import { Startpage } from "components/Startpage";
import { Login } from "components/Login";
import { Register } from "components/Register";
import { Addmarket } from "components/Addmarket";
import { Marketlist } from "components/MarketList";
import { Footer } from "components/Footer";
import { ConfirmedAdd } from "components/ConfirmedAdd";

export const App = () => {
  return (
    <div className="page-container" id="outer-container">
      <BrowserRouter>
        <Navbar />
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
        <div className="box" id="page-wrap">
          <Routes>
            <Route path="/" element={<Startpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addmarket" element={<Addmarket />} />
            <Route path="/confirmedadd" element={<ConfirmedAdd />} />
            <Route path="/marketlist" element={<Marketlist />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
