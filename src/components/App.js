// import './App.css';
import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import LoginForm from './LoginForm';
import LtGoalsForm from './LtGoalsForm';
import Goals from './Goals';
import Goal from './Goal';
import MonthlyEventsView from './MonthlyEventsView'
import WeeklyEventsView from './WeeklyEventsView'
import UserProfile from './UserProfile'
import { findGoalById } from '../utils/goalUtils'

//import reducer and state
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { data } from '../services/data'
import { getGoals } from '../services/goalServices';
import { getLTGoals } from '../services/lifetimeGoalServices';
// import jwt_decode from 'jwt-decode
import { getEmailFromJWT } from '../utils/authUtils';
function App() {
  
  // const { termGoals } = data
  
  // set initial, empty, state for first render.
  // right now I'm unconcerned about users, auth, and events. I just want to get
  // goals rendering properly, and get the goals route rendering id.


  const initialState = {
    loggedInUser: localStorage.getItem("jwt") ? true : false,
    lTGoals:[],
    termGoals: [],
    // set defaults for filter form on app load.
    // work out how to move this out of here to
    // clean up the file...
    filter:{
      filteredLongTermGoals: [],
      showCompleted: false,
      showActive: true,
    },
    filteredGoals: [], 
    selectedDate: `${new Date(new Date().toDateString())}`
  };
  
  // instantiate reducer
  const [store, dispatch] = useReducer(reducer, initialState);
  const {termGoals, loggedInUser} = store;
  console.log(loggedInUser)
  
  //instantiate error messages
  const [errors, setErrors] = useState({});

  return (
    <div className="App">
    <StateContext.Provider value={{store,dispatch}}>
      <Router>
        <Switch>
          {!loggedInUser ? 
            <main>
              <Route path={"/"}>
                <Redirect to="sign_in" />
              </Route>
              <Route exact path="/sign_in" component={LoginForm} />
              <Route exact path="/sign_up" component={LtGoalsForm} />
            </main>
          :
            <>
              <Nav />
              <main>
                <Route exact path="/">
                  <Redirect to="goals" />
                </Route>
                <Route exact path="/goals" component={Goals} />
                <Route exact path="/goals/:id" component={Goal} />
                {/* <Route exact path="/goals/:id"
                  render={ (props) => <Goal {...props}
                  termGoal={findGoalById(termGoals, props.match.params.id)}/>}
                /> */}
                <Route exact path="/monthly_events" component={MonthlyEventsView} />
                <Route exact path="/weekly_events" component={WeeklyEventsView} />
                <Route exact path="/profile" component={UserProfile} />
              </main>
            </>
          }
        </Switch>
      </Router>
    </StateContext.Provider>

    </div>
  );
  
}

export default App;
