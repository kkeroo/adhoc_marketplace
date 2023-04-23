import './App.css';
import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import CreateListing from './components/CreateListing';

const App = () => {

  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/create' Component={CreateListing}/>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App;
