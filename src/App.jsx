import React from 'react';
import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dharampal from './dharampal/pages/register/Register';
import Sunil from './sunil/pages/register';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Footer from './components/Footer';
import Login from './Pages/AuthPages/Login';
import Register from './Pages/AuthPages/Register';
import { UserProvider } from './UserContext';


function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
