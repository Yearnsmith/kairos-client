import React, { useEffect, useState } from 'react'
import { Form, Button, Grid} from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { UseGlobalState } from '../utils/stateContext'
import { createGoal, updateGoal } from '../services/goalServices'
import { compileExistingGoal, compileNewGoal, extractGoalData } from '../utils/goalUtils'

export default function NewGoalModal({setOpen, goal, toggleTriggerColor, setGoalUpdated}) {
    // bring in Global State
    const {store, dispatch} = UseGlobalState();
    
    // bring in id from url parameters
    const {id} = useParams();

    //for error handling
    const [error, setError] = useState();

    // set LifetimeGoalOptions
    const [lifetimeGoalOptions, setLTG] = useState([])

    // After first render, get lifetime goals from store and map them into
    // and array of objects to populate the lifetime goal dropdown
    useEffect(()=> {
        const options = store.lTGoals.map((g)=>{
            return {key: g.type, text: g.description, value: g.id}
        })
        setLTG(options)
    },[])

    //set time period options for time period dropdown
    const timePeriodOptions = [
        {key: 'day', text: 'Day', value: 'day'},
        {key: 'week', text: 'Week', value: 'week'},
        {key: 'month', text: 'Month', value: 'month'},
        {key: 'years', text: 'Year', value: 'year'}
    ]

    // prefil timeframe with 1, to give visual hint to users    
    const [formData, setFormData] = useState({timeframeDigit: '1'})
    const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = formData
    
    // If we are editing a goal, this keeps the state locally
    // to perform an Object.assign on later (with the form data)
    const [goalData, setGoalData] = useState('')

    // controlled dropdown inputs
    // https://medium.com/@saphieabayomi/accessing-input-values-from-a-semantic-ui-react-dropdown-f9ede94976fa
    function handleDropdown(event, data){
        setFormData({
            ...formData,
            [data.name]: data.value
        });
    }
    // controlled everyting else input
    function handleInput(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // If there is an id (see line 13) load it into formData and goalData (see lines 40-41)
    useEffect(() => {
        if(id){
            setGoalData(goal)
            setFormData(extractGoalData(goal))
        }
    }, [id])

    // submitting form
    function handleSubmit(e){
        e.preventDefault();
        
        // for handling a brand new goal
        if(!id){

            // coalate form data into new goal and temp filler for Gaols view
            const newGoal = compileNewGoal(formData)
            //send goal data to database
            createGoal(newGoal)
                .then(goal => {
                    dispatch({type:'addGoal', data: goal}) //add goal to TermGoals 
                })
                .then(()=>{
                    dispatch({type: 'setFilter', data: store.filter})// filter termGoals
                })
                .catch(e => console.error(e.message)) //return an error if the api request fails
                
                setFormData({}) // clear form fields

        } else{// if there is an id (in params), Object.assign goals using complileExistingGoal
            const updatedGoal = compileExistingGoal(goalData, formData)
            //send goal to API to update
            updateGoal({...updatedGoal})

            // send this function back to Goal component to
            // update itself. We should replace this with a
            //reducer function.
            setGoalUpdated(true)
        }
        // close the modal (send this back down to modal)
        setOpen(false)
        
        // change icon back to grey (send this back down to modal)
        // But only if we're not editing a form.
        if(!id){ toggleTriggerColor() }
    }


    //render form
    return (
        <Form onSubmit={handleSubmit}>
            
            <Form.Input
                label='title'
                name='title'
                id='title'
                placeholder='A descriptive title'
                value={title}
                fluid
                onChange={handleInput}
                required
            />
            <Form.Field>
            
            <Form.TextArea
                label='description'
                name='description'
                id='description'
                value={description}
                placeholder='A description the future you can understand'
                onChange={handleInput}
                required
            />
            </Form.Field>
            
            <Form.Field>
                <Form.Dropdown
                    label='lifetime goal'
                    name='lifetimeGoal'
                    id='lifetimeGoal'
                    // text='choose a lifetime goal'
                    value={lifetimeGoal}
                    options={lifetimeGoalOptions}
                    defaultValue={lifetimeGoal}
                    placeholder='choose one'
                    selection
                    compact
                    onChange={handleDropdown}
                    required
                    />
            </Form.Field>
            
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Field
                        label='timeframe'
                        control='input'
                        type='number'
                        name='timeframeDigit'
                        id='timeframeDigit'
                        min={1}
                        max={9999}
                        value={timeframeDigit}
                        onChange={handleInput}
                        required
                        />
                    </Grid.Column>

                    <Grid.Column>
                        <Form.Dropdown
                            selection
                            scrolling
                            compact
                            label='period'
                            name='timeframePeriod'
                            id='timeframePeriod'
                            value={timeframePeriod}
                            options={timePeriodOptions}
                            defaultValue={timeframePeriod}
                            onChange={handleDropdown}
                            required
                            />
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row columns={1} style={{justifyContent: 'flex-end', padding: '2rem'}}>
                    {/* if there is an id in params, we are editing this form, so the wording changes. */}
                    <Button  compact icon='check' content={!id ? 'Add Goal' : 'Edit Goal'} labelPosition='right' />
                </Grid.Row>
            
            </Grid>
        </Form>
    )}
