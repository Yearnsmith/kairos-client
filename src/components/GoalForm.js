import React, { useEffect, useState } from 'react'
import { Form, Button, Grid, Modal, Segment, Container, Card } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { UseGlobalState } from '../utils/stateContext'
import { createGoal, updateGoal } from '../services/goalServices'
import { compileExistingGoal, compileNewGoal, extractGoalData } from '../utils/goalUtils'
import { getLTGoalById } from '../services/lifetimeGoalServices'
import { getGoalById } from '../services/goalServices'

export default function NewGoalModal({setOpen, toggleTriggerColor, setGoalUpdated}) {
    // bring in Global State
    const {store, dispatch} = UseGlobalState();
    
    // set LifetimeGoalOptions
    const [lifetimeGoalOptions, setLTG] = useState([])

    useEffect(()=> {
        const options = store.lTGoals.map((g)=>{
            return {key: g.type, text: g.description, value: g.id}
        })
        setLTG(options)
    },[])

    const timePeriodOptions = [
        {key: 'day', text: 'Day', value: 'day'},
        {key: 'week', text: 'Week', value: 'week'},
        {key: 'month', text: 'Month', value: 'month'},
        {key: 'years', text: 'Year', value: 'year'}
    ]

    
    const [formData, setFormData] = useState({timeframeDigit: '1'})
    const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = formData
    
    const [goalData, setGoalData] = useState('')

    // save new gaol to state

    // controlled form inputs
    // https://medium.com/@saphieabayomi/accessing-input-values-from-a-semantic-ui-react-dropdown-f9ede94976fa
    function handleDropdown(event, data){
        setFormData({
            ...formData,
            [data.name]: data.value
        });
    }
    
    function handleInput(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const {id} = useParams();

    // I'm sorry for what you see below.
    useEffect(() => {
        if(id){
            getGoalById(id)
                .then(goal => {
                    setGoalData(goal)
                    return extractGoalData(goal)
                })
                .then( data =>{
                    setFormData(data)
                })
        .catch(e => console.error(e))
        }
    }, [id])

    function handleSubmit(e){
        e.preventDefault();
        if(!id){
            // coalate form data into new goal and temp filler for Gaols view
            const newGoal = compileNewGoal(formData)
            //send goal data to database
            createGoal(newGoal)
            
            .then(goal => {
                dispatch({type:'addGoal', data: goal})
            })
            .then(()=>{
                dispatch({type: 'setFilter', data: store.filter})
            })
            .catch(e => console.error(e.message))
            
            setFormData({})
        } else{
            const updatedGoal = compileExistingGoal(id, goalData, formData)
            console.log('updatedGoal:', updatedGoal)
            updateGoal({...updatedGoal})
            setGoalUpdated(true)
        }
        setOpen(false)
        toggleTriggerColor()
    }


    //render form
    return (
        <Form onSubmit={handleSubmit}>
            {/* <Form.Field> */}
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
            {/* </Form.Field> */}
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
                            // value={fancyAFSelection}
                            value={timeframePeriod}
                            options={timePeriodOptions}
                            defaultValue={timeframePeriod}
                            // placeholder='days/weeks...'
                            onChange={handleDropdown}
                            required
                            />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} style={{justifyContent: 'flex-end', padding: '2rem'}}>
                    <Button  compact icon='check' content={!id ? 'Add Goal' : 'Edit Goal'} labelPosition='right' />
                </Grid.Row>
            </Grid>
        </Form>
    )}
