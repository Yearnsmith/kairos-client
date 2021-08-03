// import './App.css';
import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import LoginForm from './LoginForm';
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
    ],
    // set defaults for filter form on app load.
    // work out how to move this out of here to
    // clean up the file...
    filter:{
      filteredLongTermGoals: [],
      showCompleted: false,
      showActive: true,
    },
    filteredGoals: []
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
      <Nav />
    <StateContext.Provider value={{store,dispatch}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="goals" />
          </Route>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/goals" component={Goals} />
          <Route exact path="/goals/:id"
            render={ (props) => <Goal {...props}
              termGoal={findGoalById(termGoals, props.match.params.id)}/>}
          />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/profile" component={UserProfile} />
        </Switch>
      </Router>
    </StateContext.Provider>

    </div>
  );
  
}

export default App;
