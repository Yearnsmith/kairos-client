// import './App.css';
import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Goals from './Goals';
import Goal from './Goal';
import Calendar from './Calendar'
import UserProfile from './UserProfile'
import { findGoalById } from '../utils/goalUtils'

//import reducer and state
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { data } from '../services/data'

function App() {

  // const { termGoals } = data

  // set initial, empty, state for first render.
  // right now I'm unconcerned about users, auth, and events. I just want to get
  // goals rendering properly, and get the goals route rendering id.
  const initialState = {
    termGoals: [
      // include just enough properties to avoid error,
      {title:'',events:[]},
    ]
  };

  // instantiate reducer
  const [store, dispatch] = useReducer(reducer, initialState);
  const {termGoals} = store;

  // Run dispatch as a side-effect of loading the page,
  // effectively updating the data in store.
  useEffect( () => {
    dispatch({
      type: "setTermGoals",
      data: data.termGoals
    });
    // console.log(data.termGoals[0])
  },[]);

  return (
    <div className="App">
      <Nav />

    <Router>
      <Switch>
        {/* <Route exact path="/goals" component={Goals} /> */}
        <Route exact path="/">
          <Redirect to="goals" />
        </Route>
        <Route exact path="/goals">
          <Goals termGoals={termGoals} />
        </Route>
        <Route exact path="/goals/:id"
          render={ (props) => <Goal {...props}
            termGoal={findGoalById(termGoals, props.match.params.id)}/>}
        />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </Router>

    </div>
  );
  
}

export default App;
