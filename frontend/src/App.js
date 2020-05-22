import React from 'react';
import NavBar from './components/navBar';
import CategoryList from './components/CategoryList';
import Register from "./components/auth/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const authBackground ="https://images.unsplash.com/photo-1458571037713-913d8b481dc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920"

function App() {
  
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <div >
            <NavBar/>
          </div>
        </Route>
     
        <Route exact path="/register">
          <div style={{backgroundImage: `url(${authBackground})`}}>
            <Register/>
          </div>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
