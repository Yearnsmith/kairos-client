// Used example at: https://testing-library.com/docs/example-react-router/
// import { render, screen } from '@testing-library/react';
import { render, screen, renderWithRouter } from './test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';

import '@testing-library/jest-dom/extend-expect'
import App from '../App';

// import test data using data.json file.
// This file should be moved to './test-data' directory when
// api is attached to react app. 
import {data} from '../../services/data'
const testData = data;

//Testing navbar displaying
// describe('navbar', () => {
//   // testing navbar render
//   //set up render
//   render(<App />)
//   it('should render the nav element', () => {
//     const navBar = screen.getByRole('navigation');
//     expect(navBar).toBeInTheDocument();
//   });
// 
// });

describe('Views', ()=>{
  // Test redirect
  it('should display Goals view when URL is at "/"', () => {
    renderWithRouter(<App />, {route: '/'});
    // screen.debug();
    const goalsView = screen.getByRole('heading', {name: /goals/i});
    expect(goalsView).toBeInTheDocument();
  });

  // Test going to Goals view
  it('should display Goals view when URL is at "/goals"', () => {
    // render App with history
    renderWithRouter(<App />, {route: '/goals'});

    const {termGoals} = testData;
    
    // create list of term goal titles from testing data
    const termGoalsText = termGoals.map( goal => goal.title);
    // select each goal item from list of goals
    const goalEls = screen.getAllByRole('listitem');
    // extract the html
    const goalElsListItems = goalEls.map(el => el.firstChild)
    // extract the text content
    const goalElsText = goalEls.map(el => el.textContent)
    
    // text content of list item headers should match list of titles from data
    expect(goalElsText).toEqual(termGoalsText);
    // each goal should have the instance class
    goalElsListItems.forEach( el => expect(el).toHaveClass('segment') )

  });

  it('should display specific goal when url is at "/goals/:id"', ()=>{
    // set goal and title to test against
    const goalToDisplay = data.termGoals[3]
    const heading = goalToDisplay.title;
    // render the goal
    renderWithRouter(<App />, {route: `/goals/${goalToDisplay.id}`});
    // select element to test
    const headingEl = screen.getByRole('heading', {name: heading, level: 2});
    // see if element is in the document
    expect(headingEl).toBeInTheDocument();

  })

  it('should display Calendar view when URL is at /calendar', () => {
    // render App with history
    renderWithRouter(<App />, {route: '/calendar'});
    // get test-id
    // const goalsView = screen.getByTestId('goalsView');
    const goalsView = screen.getByRole('heading', {name: /Calendar/i});
    expect(goalsView).toBeInTheDocument();
  });

  it('should display Profile view when URL is at /profile', () => {
    // render App with history
    renderWithRouter(<App />, {route: '/profile'});
    // get test-id
    // const goalsView = screen.getByTestId('goalsView');
    const goalsView = screen.getByRole('heading', {name: /Profile/i});
    expect(goalsView).toBeInTheDocument();
  });
});

describe('integration with goals', () => {
  beforeEach( () => renderWithRouter(<App />, {route: '/goals'}) );
  // test routing to specific goals.
  it('should route to specific goal component when user clicks on goal', () => {
    
    // select first goal item.
    const goalEls = screen.getAllByRole('listitem');

    // set random number between 0 and length of goals item -1
    const goalItemToSelect = Math.floor(Math.random() * goalEls.length);
    // select goal item
    const goalEl = goalEls[goalItemToSelect];
    // get matching heading from data
    const heading = testData.termGoals[goalItemToSelect].title;

    userEvent.click(goalEl)
    const headingEl = screen.getByRole('heading', {name: heading, level: 2});
    expect(headingEl).toBeInTheDocument();
  });


});