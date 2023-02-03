// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import './App.css'


//importing files all our files here
import Nav from './components/Nav';
import Home from './components/Home';
import Image from './components/Image';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';

//making router files
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <Nav/>
      
      <Route path="/home" >
      <Home />
      </Route>


      <Route path="/about">
        <About />
      </Route>
      
      <Route path="/img">
        <Image />
      </Route>


      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Signup />
      </Route>

  
      {/* <Nav />

      <Route>
        <Home path="/" />
      </Route>

      <Route path="/about">
        <About />
      </Route>


      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route> */}
      {/* <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch> */}
    </>
  );
}

export default App;
