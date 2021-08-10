import React, { useState } from 'react'
import { Button, Form, Header,Input, Segment } from 'semantic-ui-react';
import { signUp, signIn } from '../services/authServices';
import { UseGlobalState } from '../utils/stateContext';


export default function LoginForm({history}) {

    const [formData, setFormData] = useState({email:"", password:""});
    const { email, password } = formData;
    
    const {dispatch} = UseGlobalState();

     function handleChange(event){
         setFormData({
             ...formData,
             [event.target.name]: event.target.value
         });
     }
     function handleSubmit(event){
        //  console.log(event)
         event.preventDefault();
        //  let submitter = event.nativeEvent.submitter.id;
        //  console.log(submitter);
        console.log(subButton)
         if(email.length > 0 && password.length > 0){
             if( subButton === 'signUp' ){
                 
                 signUp({email: email, password: password}).then((response)=> {
                     if (response.error){
                         console.log(response.error.message)
                     }else {
                         console.log(response)
                         console.log('Jeeves, send this user in! ')
                         return history.push("/sign_up")
                     }
                 });
             } else {
                 signIn({email: email, password: password}).then( response =>{
                    console.log(response)
                })
                .then( _ =>  {
                    dispatch({type: "setLoggedInUser", data:"true"})
                    history.push("/goals")
                })
                // return history.push("/goals")
                 console.log('Take this person to the cloak room, Jeeves')
             }
         }
     }

     const [subButton, setSubButton] = useState("")
     console.log(subButton)
     

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
                            <Button content='Sign In' id='signIn' onClick={()=> setSubButton('signIn')} />
                            <Button content='Sign Up' id='signUp' onClick={()=> setSubButton('signUp')}/>
                        </Button.Group>

                    </Form.Group>
            </Form>
        </Segment>
    );
}
