import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Store from "./components/Pages/Store";
import Rent from "./components/Pages/Rent";
import Home from "./components/Pages/Home";
import NavBar from './components/NavBar';
import './App.css';


export default class App extends Component {

  static displayName = App.name;

  render() {
    return (
      <div className='App'>

        <NavBar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>

      </div>
    );
  }
}
