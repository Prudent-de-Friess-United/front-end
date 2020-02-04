import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login"
import { Link } from "react-router-dom";

function App() {
  return (
    <div>    
      <Router>
        <Navbar/>
        <div className="App">
          <h1>Hello world!</h1>
        
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/sign-up">
            <Signup />          
          </Route>
          <Route path="/sign-in">
            <Login/>
          </Route>
          <Route path="/user-home">
            <Home /> 
          </Route>
       </div>
      </Router>
    </div>
  );
} 

export default App;
