import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Goals from './Goals';
import Goal from './Goal';
import Calendar from './Calendar'
import UserProfile from './UserProfile'

const data = {
  termGoals: [
      {title:"Goal Number 1",
      description: 'My very first goal',
      longTermGoal: 'lifestyle',
      timeframe: '1 week',
      color: 'orange'},
      {title: "Goal Number 2", color: 'violet'},
      {title: "Goal Number 3", color: 'yellow'},
      {title: "Goal Number 4", color: 'teal'}
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
        <Route exact path="/goal">
          <Goal termGoal={termGoals[0]} />
        </Route>
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </Router>

    </div>
  );
  
}

export default App;
