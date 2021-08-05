// import './App.css';
import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import LoginForm from './LoginForm';
import LtGoalsForm from './LtGoalsForm';
import Goals from './Goals';
import Goal from './Goal';
import MonthlyEventsView from './MonthlyEventsView'
import UserProfile from './UserProfile'
import { findGoalById } from '../utils/goalUtils'

//import reducer and state
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { data } from '../services/data'
import { getGoals } from '../services/goalServices';

function App() {

  // const { termGoals } = data

  // set initial, empty, state for first render.
  // right now I'm unconcerned about users, auth, and events. I just want to get
  // goals rendering properly, and get the goals route rendering id.


  const initialState = {
    termGoals: [
      // include just enough properties to avoid error,
      {title:'',events:[]},
    ],
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
  const {termGoals} = store;

  

  //instantiate error messages
  const [errors, setErrors] = useState({});

  // Run dispatch as a side-effect of loading the page,
  // effectively updating the data in store.
  useEffect( () => {

    // getGoals()
    //   .then( goals =>{
        dispatch({
          type: "setTermGoals",
          // data: goals
          data: data.termGoals
        });
      // })
      // .catch( error => {
      //   console.log(error);
      //   setErrors({status: error.status, message: error.message})
      // });

    // (this prefills filter Dropdown with all the LongTermGoals
    // without having to hardcode the long term goals. We could abstract it,
    // but the reducer action already fills an empty filteredLongTermGoals
    // array into a full one).
    dispatch({
      type: "setFilter",
      data: store.filter
    })
  },[]);

  return (
    <div className="App">
      {/* <Nav /> */}
    <StateContext.Provider value={{store,dispatch}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="goals" />
          </Route>
          {/*embed in home component */}
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/sign_up" component={LtGoalsForm} />
          <Route exact path="/goals" component={Goals} />
          <Route exact path="/goals/:id"
            render={ (props) => <Goal {...props}
              termGoal={findGoalById(termGoals, props.match.params.id)}/>}
          />
          <Route exact path="/monthly_events" component={MonthlyEventsView} />
          <Route exact path="/profile" component={UserProfile} />
        </Switch>
      </Router>
    </StateContext.Provider>

    </div>
  );
  
}

export default App;
