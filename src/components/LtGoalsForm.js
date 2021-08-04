import React, { useState } from 'react'
import { Form, Header,Icon,Input, Segment, TextArea } from 'semantic-ui-react';
// import { UseGlobalState } from '../utils/stateContext'

//we will eventually pull this list dynamically from state, or from an API call
const goalList = ['career','artistic','educational','physical','lifestyle'];

// create initial state from the goalList. We could combine this
// with the above function into one if we're pulling from state.
const initialState = {}
goalList.forEach( el => {
    initialState[el] = "" 
})

// This enables us to autonomously generate the text boxes
const textAreaValues = goalList.map( goal =>
    {return {
        name: goal,
        labelText: goal.charAt(0).toUpperCase() + goal.slice(1)
    }});


    //** Component Starts Here *//
export default function SignUpForm() {
    // reserved for hooking in global state and saving form
    // const {dispatch} = UseGlobalState();
    
    // we use local state for form inputs
    const [formData, setFormData] = useState(initialState);
    // const { career, artistic, educational, physical, lifestyle } = formData;
    
    // This tracks which field has a save button attached.
    // it simply stores the name of the field.
    const [activeField, setActiveField] = useState();

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
                        <Segment clearing key={goal.name}>
                            <Form.Field>
                                <label htmlFor={goal.name}><Header as='h3'>{goal.labelText}</Header></label>
                                <TextArea
                                    id={goal.name}
                                    name={goal.name}
                                    placeholder={goal.name}
                                    value={formData[goal.name]}
                                    onChange={handleChange}
                                    // change field to 'active'. I don't want a toggle here,
                                    // because if I switch focus back from the save button,
                                    // it will dissapear the save button.
                                    onFocus={() => setActiveField(goal.name)}
                                />
                            </Form.Field>
                            {/* if `activeField` is equal to the current itteration, display a save button, otherwise, nothing */}
                            {activeField === goal.name ?
                                <Form.Button
                                    compact
                                    content='save'
                                    icon='check'
                                    floated='right'
                                    // reserved for saving field value to global state (maybe with an api call, too?)
                                    // perhaps include an 'undoField' like in the goal filter component
                                    // (for when segment loses focus without a save.)
                                    onClick={() => {
                                        console.log(`Jeeves, file "${formData[goal.name]}" under "${goal.name}".`)
                                        toggleActiveField(goal.name)
                                    }}
                                />
                            : null
                            }
                        </Segment>);
                })}
                {/* get us out of here! Work out how to centre this thing. */}
                <Form.Button compact content='Done' icon='check' />
            </Form>
        </Segment>
    );
}
