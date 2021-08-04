import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const {debug, getByRole} = screen;

import LoginForm from '../LoginForm';

// Login form should render an email input and a password input
describe('Login form render', () =>{
    
    const emailField = screen.getByPlaceholderText('email')
    const passwordField = screen.getByLabelText(/password/i)

    it('should display an email input, password input, and two buttons: one to log in and one to sign up',()=>{
        render(<LoginForm />)
        // debug();
        expect().toBeInTheDocument();
        expect().toBeInTheDocument();

        expect(getByRole('button', {name: /(sign in)/i})).toBeInTheDocument();
        expect(getByRole('button', {name: /(sign up)/i})).toBeInTheDocument();

    })

    it('clicking sign in should render a different result than signup', ()=>{
        
    })
})