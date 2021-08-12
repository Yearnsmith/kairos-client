import React, { useState } from 'react'
import { Form, Header, Segment, TextArea } from 'semantic-ui-react';
import { createLTGoal, updateLTGoal, getLTGoals } from '../services/lifetimeGoalServices';
import { UseGlobalState } from '../utils/stateContext'

//we will eventually pull this list dynamically from state, or from an API call
// possibly move to initial state in App.js?
const goalList = ['career','artistic','intellectual','physical','lifestyle'];

// create initial state from the lifetime goals list. We could combine this
// with the above function into one if we're pulling from state.
const initialState = {}

goalList.forEach( el => {
    initialState[el] = "" 
})



// This enables us to autonomously generate the text boxes
const textAreaValues = goalList.map( goal =>
    {return {
        key: goal,
        type: goal,
        labelText: goal.charAt(0).toUpperCase() + goal.slice(1)
    }});

    
    

    //** Component Starts Here *//
    export default function SignUpForm({history}) {
    // reserved for hooking in global state and saving form
    const {dispatch, store} = UseGlobalState();
    const {globalBeenSaved} = store

    let hasBeenSaved = globalBeenSaved ? globalBeenSaved : []

    
    // we use local state for form inputs
    const [formData, setFormData] = useState(initialState);

    // This tracks which field has a save button attached.
    // it simply stores the name of the field.
    const [activeField, setActiveField] = useState('');

    

    // This toggles a field on and off, since use state stores the name
    // of the field, this takes an input of fieldName, and checks it against
    // the current activeField state.
    function toggleActiveField(fieldName){
        setActiveField( fieldName !== activeField ? fieldName : "" );
    }

    // For handling controlled components
    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // reserved for saving form details to api & global state
    function handleSubmit(event){
        event.preventDefault();
        dispatch({type: "setLoggedInUser", data:"true"})
        history.push("/goals")
        console.log('Take the files back to the filing cabnet, Jeeves.')
    }

    

    return (
        <Segment>
            <Header>
                <Header.Content as='h2'>Thanks for choosing kairos.</Header.Content>
                <Header.Subheader>Let's start by setting up some life goals.</Header.Subheader>
            </Header>
            <Form onSubmit={handleSubmit}>
                {/* map through array of goal objects and render a segment*/}
                {/*//TODO: Add a ternary to display no text area by default, and a text area on label focus/click/touch */}
                {textAreaValues.map( goal => {
                    return(
                        <Segment clearing key={goal.type}>
                            <Form.Field>
                                <label htmlFor={goal.type}><Header as='h3'>{goal.labelText}</Header></label>
                                <TextArea
                                    id={goal.type}
                                    name={goal.type}
                                    placeholder={`write a lifetime ${goal.type} goal here.`}
                                    value={formData[goal.type]}
                                    onChange={handleChange}
                                    onBlur={() => {
                                        if (hasBeenSaved.map(saved=>saved.type).includes(`${goal.type}`)) {
                                            updateLTGoal({type: goal.type, description: formData[goal.type]}, 
                                                `${hasBeenSaved.map(saved=>(saved.type === `${goal.type}`) ? saved.id : "").filter(item => item !== "")[0]}`)
                                                .then(response => {
                                                    if(response.error){
                                                        console.error(response.error)
                                                    } else {
                                                        console.log("Life Time Goal Updated!")
                                                    }
                                                })
                                        } else {
                                            createLTGoal({type: goal.type, description: formData[goal.type]}).then(response =>{
                                                if(response.error){
                                                    console.error(response.error);
                                                    //TODO: insert UI error block
                                                }else{
                                                    console.log(`Jeeves, file "${formData[goal.type]}" under "${goal.type}".`)
                                                    hasBeenSaved.push({type: `${goal.type}`, id: `${response.id}`})
                                                } 
                                            })
                                        }   
                                    }}
                                    onFocus={() => setActiveField(goal.type)}
                                />
                            </Form.Field>
                            {/* if `activeField` is equal to the current itteration, display a save button, otherwise, nothing */}
                            {activeField === goal.type ?
                                <Form.Button
                                    compact
                                    content='save'
                                    icon='check'
                                    floated='right'
                                    // save field entry to state
                                    onClick={() => {
                                        console.log(hasBeenSaved)
                                        console.log(`${goal.type}`)
                                        if (hasBeenSaved.map(saved=>saved.type).includes(`${goal.type}`)) {
                                            console.log('chekpoint')
                                            updateLTGoal({type: goal.type, description: formData[goal.type]}, 
                                                `${hasBeenSaved.map(saved=>(saved.type === `${goal.type}`) ? saved.id : "").filter(item => item !== "")[0]}`)
                                                .then(response => {
                                                    if(response.error){
                                                        console.error(response.error)
                                                    } else {
                                                        console.log("Life Time Goal Updated!")
                                                    }
                                                })
                                        } else {
                                            createLTGoal({type: goal.type, description: formData[goal.type]}).then(response =>{
                                                if(response.error){
                                                    console.error(response.error);
                                                    //TODO: insert UI error block
                                                }else{
                                                    console.log(`Jeeves, file "${formData[goal.type]}" under "${goal.type}".`)
                                                    hasBeenSaved.push({type: `${goal.type}`, id: `${response.id}`})
                                                } 
                                            })
                                        }   
                                        toggleActiveField(goal.type)
                                    }}
                                    />
                            : null
                            }
                        </Segment>);
                })}
                {/* get us out of here! Work out how to centre this thing. */}
                <Form.Button compact content='Done' icon='check' floated='right' />
            </Form>
        </Segment>
    );
}
