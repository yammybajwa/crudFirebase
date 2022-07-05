import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Compnent/Header/Navbar";
import Footer from "./Compnent/Footer/Footer";
import From from "./Form/From";
import Users from "./Showdata/Users";
export default function Index() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
            <Route path="/" element={<From />} />
            <Route path="/contact" element={<Users />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
