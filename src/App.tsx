import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HeaderLogged from './components/header/HeaderLogged';
import Header from './components/header/Header';
import HomeUser from './pages/HomeUser';
import { User } from './context/Context';
import { ToastContainer } from 'react-toastify';
import Profile from './components/profile/Profile';
import PostJob from './components/posts/PostJob';
import SingleOffer from './components/posts/SingleOffer';
import CurrencyConverter from './components/additional/CurrencyConverter';
import Awareness from './pages/Awareness';


function App() {
  const { currentUser } = User();

  return (
    <>
      {currentUser ? <HeaderLogged /> : <Header />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/user" element={<HomeUser />} />}
        {!currentUser && <Route path="/" element={<Home />} />}
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/postjob' element={<PostJob />} />
        <Route path='/offer/:offerId' element={<SingleOffer />} />
        <Route path='/currency' element={<CurrencyConverter />} />
        <Route path='/guides' element={<Awareness />} />

        {/* En lugar de mostrar NotFound, se define una condición que redirige las rutas inexistentes */}
        <Route path="*" element={<Navigate to={!currentUser ? "/" : "/user"} />} />
      </Routes>
    </>
  );
}

export default App;