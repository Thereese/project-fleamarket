import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { Navbar } from "components/Navbar";
import { About } from "components/About";
import { Contact } from "components/Contact";
import { Startpage } from "components/Startpage";
import { Login } from "components/Login";
import { Register } from "components/Register";
import { Addmarket } from "components/Addmarket";
import { Search } from "components/Search";
import { Marketlist } from "components/MarketList";
import { Footer } from "components/Footer";
import { ConfirmedAdd } from "components/ConfirmedAdd";

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
            <Route path="/search" element={<Search />} />
            <Route path="/marketlist" element={<Marketlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
    //dont have an account? sign up here! (link to register, with routes)
  );
};
