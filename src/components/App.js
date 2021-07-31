// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Goals from './Goals';
import Goal from './Goal';
import Calendar from './Calendar'
import UserProfile from './UserProfile'

//import reducer and state
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { data } from '../services/data'

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
