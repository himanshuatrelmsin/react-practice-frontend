import React from "react";
import "./App.scss";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dharampal from "./dharampal/pages/register/Register";
import Sunil from "./sunil/pages/register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AddProduct from "./Pages/Products/AddProduct";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Login from "./Pages/AuthPages/Login";
import Register from "./Pages/AuthPages/Register";
import { UserProvider } from "./UserContext";
import UserDetails from "./Pages/UserDetails";

const data = [
  {
    userId: "6f487228-9b78-4946-a784-5554882016ff",
    name: "Himanshu Atre",
    email: "himanshuatre088@gmail.com",
    dob: "1999-01-30T00:00:00.000Z",
  },
  // Add more data as needed
];

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<AddProduct />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dharampal" element={<Dharampal />} />
          <Route path="/sunil" element={<Sunil />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
