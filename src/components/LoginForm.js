import React, { useState } from 'react'
import { Button, Form, Header,Input, Segment } from 'semantic-ui-react';
// import { UseGlobalState } from '../utils/stateContext'


export default function LoginForm() {
    // const {dispatch} = UseGlobalState();

    const [formData, setFormData] = useState({email:"", password:""});
    const { email, password } = formData;
    

     function handleChange(event){
         setFormData({
             ...formData,
             [event.target.name]: event.target.value
         });
     }
     function handleSubmit(event){
         event.preventDefault();
         let submitter = event.nativeEvent.submitter.id;
         if(email.length > 0 && password.length > 0){
             if( submitter === 'signIn' ){
                 console.log('Jeeves, send this user in! ')
             } else {
                 console.log('Take this person to the cloak room, Jeeves')
             }
         }
     }

    return (
        <Segment>
            <Header>
                <Header.Content as='h2'>Unlock your best self</Header.Content>
                <Header.Subheader>sign up today to start manifesting your true potential</Header.Subheader>
            </Header>
            <Form onSubmit={handleSubmit}>
                    {/* <label htmlFor='email'>email</label> */}
                    <Form.Input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        placeholder='email'
                        icon='mail'
                        iconPosition='left'
                        required
                    />
                    <Form.Field>
                        <label hidden htmlFor='password'>Password</label>
                        <Input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='password'
                            icon='key'
                            iconPosition='left'
                            required
                        />
                    </Form.Field>
                    <Form.Group style={{justifyContent: 'center'}}>
                        <Button.Group>
                            <Button content='Sign In' id='signIn' />
                            <Button content='Sign Up' id='signUp' />
                        </Button.Group>

                    </Form.Group>
            </Form>
        </Segment>
    );
}
