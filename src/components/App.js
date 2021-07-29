import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Goals from './Goals';
import Calendar from './Calendar'
import UserProfile from './UserProfile'

const data = {
  termGoals: [
      {title: "First Goal"},
      {title: "Second Goal"},
      {title: "Third Goal"}
  ]
}

function App() {
  const { termGoals } = data
  return (
    <div className="App">
      <Nav />

    <Router>
      <Switch>
        {/* <Route exact path="/goals" component={Goals} /> */}
        <Route exact path="/goals">
          <Goals termGoals={termGoals} />
        </Route>
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </Router>

    </div>
  );
  
}

export default App;
