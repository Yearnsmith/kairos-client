// Import components
import React, { useReducer, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import LoginForm from './LoginForm';
import LtGoalsForm from './LtGoalsForm';
import Goals from './Goals';
import Goal from './Goal';
import MonthlyEventsView from './MonthlyEventsView'
import WeeklyEventsView from './WeeklyEventsView'
import UserProfile from './UserProfile'

//import reducer and state
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { getGoals } from '../services/goalServices';
import { getLTGoals } from '../services/lifetimeGoalServices';

//App begins here.
function App() {
  // using a ref to fulful useEffect dependencies
  // https://overreacted.io/a-complete-guide-to-useeffect/
  const hasFetchedData = useRef(false)
  
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
  const {loggedInUser, filter} = store;
  
  
  //instantiate error messages
  // reserved for future use
  const [errors, setErrors] = useState({});


    useEffect( () => {
    if (loggedInUser){
      if(!hasFetchedData.current){
        getLTGoals()
        .then( lTGoals => {
        dispatch({
          type: "setLTGoals",
          data: lTGoals
          });
        })
        .then( () =>{
          getGoals()
            .then( goals =>{
              dispatch({
                  type: "setTermGoals",
                  data: goals
                });
                dispatch({
                  type: "setFilter",
                  data: filter
                })
                hasFetchedData.current = true
              })
            })
            .catch( err => {
              console.error(err)
              setErrors(err.message)
            })
        }
      }
    },[loggedInUser, filter])

  return (
      
    <div className="App">
    
    {/* Context Provider for routes. Takes reducer store and dispatch as props to pass down to children */}
    <StateContext.Provider value={{store,dispatch}}>
    {/* Set BrowserRouter */}
      <Router>

        <Switch>
          {/* If there is no user logged in, user will only be able to access sign_in page, or sign_up page */}
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
              <Nav/>
              <main>
                <Route exact path="/">
                  <Redirect to="goals" />
                </Route>
                <Route exact path="/goals" component={Goals} />

                <Route exact path="/goals/:id" component={Goal} />
                {/* This is a repeated route, but we want to keep the sign_up in the sanctioned
                    area above. */}
                <Route exact path="/lifetime_goals" component={LtGoalsForm} />
                
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
