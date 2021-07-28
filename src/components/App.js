import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Goals from './Goals';
import Calendar from './Calendar'


function App() {
  return (
    <div className="App">
      <Nav />

    <Router>
      <Switch>
        <Route exact path="/goals" component={Goals} />
        <Route exact path="/calendar" component={Calendar} />
      </Switch>
    </Router>

    </div>
  );
  
}

export default App;
