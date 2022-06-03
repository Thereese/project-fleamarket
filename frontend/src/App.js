import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "components/navbar";
import { About } from "components/about";
import { Contact } from "components/contact";
import { Startpage } from "components/startpage";
import { Login } from "components/login";
import { Register } from "components/register";
import { Addmarket } from "components/addmarket";
import { Search } from "components/search";
import { Marketlist } from "components/marketlist";

export const App = () => {
  return (
    <div className="box">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Startpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addmarket" element={<Addmarket />} />
          <Route path="/search" element={<Search />} />
          <Route path="/marketlist" element={<Marketlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
    //dont have an account? sign up here! (link to register, with routes)
  );
};
