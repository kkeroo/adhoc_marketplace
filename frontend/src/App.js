import './App.css';
import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import CreateListing from './components/CreateListing';
import Profile from "./components/Profile";
import Listings from "./components/Listings";
import Items from "./components/Items";
import Login from "./components/Login";

const App = () => {

  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/login' Component={Login}/>
        {/*<Route exact path='/create' Component={CreateListing}/>*/}
        <Route exact path='/profile' Component={Profile}/>
        <Route exact path='/items' Component={Items}/>
        <Route exact path='/listings' Component={Listings}/>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App;
