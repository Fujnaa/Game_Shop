import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Store from "./components/Pages/Store";
import Rent from "./components/Pages/Rent";
import Home from "./components/Pages/Home";
import NavBar from './components/NavBar';
import './App.css';


const App = () => {

  const[loggedUser, setLoggedUser] = useState({name:"", email:"", path:"", role:"Regular"});

  const[userToken, setUserToken] = useState("");

    return (
      <>
      <div className='App'>

        <NavBar setLoggedUser={setLoggedUser} setUserToken={setUserToken}/>
      
        <Routes>
          <Route path="/" element={<Home loggedUser={loggedUser} />} />
          <Route path="/store" element={<Store loggedUser={loggedUser} userToken={userToken}/>} />
          <Route path="/rent" element={<Rent />} />
        </Routes>

      </div>
      </>
    );
}
export default App;

