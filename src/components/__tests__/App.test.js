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

        // const termGoalsText = termGoals.map( goal => goal.title);
  

});