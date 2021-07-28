// Used example at: https://testing-library.com/docs/example-react-router/
// import { render, screen } from '@testing-library/react';
import { render, screen, renderWithRouter } from './test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect'
import App from '../App';

// beforeEach( () => render(<App />, {wrapper: MemoryRouter}) )

//Testing navbar displaying
describe('navbar', () => {
  // testing navbar render
  //set up render
  render(<App />)
  it('should render the nav element', () => {
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

});

describe('Views', ()=>{
  // Test going to Goals view
  it('should display Goals view when URL is at /goals', () => {
    // render App with history
    renderWithRouter(<App />, {route: '/goals'});
    // get test-id
    // const goalsView = screen.getByTestId('goalsView');
    const goalsView = screen.getByRole('heading', {name: /Goals/i});
    expect(goalsView).toBeInTheDocument();
  });

  it('should display Goals view when URL is at /goals', () => {
    // render App with history
    renderWithRouter(<App />, {route: '/calendar'});
    // get test-id
    // const goalsView = screen.getByTestId('goalsView');
    const goalsView = screen.getByRole('heading', {name: /Calendar/i});
    expect(goalsView).toBeInTheDocument();
  });

});
