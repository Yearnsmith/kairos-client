import React, { useEffect, useState } from 'react'
import { UseGlobalState } from '../utils/stateContext'
import { Form, Modal, Button, Grid, Icon } from 'semantic-ui-react'
// import pluralize from 'pluralize'
import { createGoal } from '../services/goalServices'
import { compileNewGoal } from '../utils/goalUtils'
import { getLTGoals } from '../services/lifetimeGoalServices'

export default function NewGoalModal() {
    // set modal status
    const [open, setOpen] = useState(false)

    const {store, dispatch} = UseGlobalState();
    
    const [lifetimeGoalOptions, setLTG] = useState([])

    const [triggerColor, setTriggerColor] = useState(['grey', 'grey'])

    
    
    const [timePeriodOptions, setTPO] = useState([
        {key: 'day', text: 'Day', value: 'day'},
        {key: 'week', text: 'Week', value: 'week'},
        {key: 'month', text: 'Month', value: 'month'},
        {key: 'Year/s', text: 'Year', value: 'year'}
    ])


    const [formData, setFormData] = useState({timeframeDigit: '1'})
    const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = formData
    
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
    const toggleTriggerColor = ()=>{
        setTriggerColor(
            triggerColor.includes('grey') ? ['blue', 'green'] : ['grey', 'grey']
            )
    }
    
    //render modal
    return (
        <Modal
            closeIcon
            onClose={() => {
                toggleTriggerColor()
                setOpen(false)
            }}
            onOpen={() => {
                setOpen(true)
                // getLTGoals()
                // .then(goals =>{
                    const options = store.lTGoals.map((g)=>{
                        console.log(g)
                        return {key: g.type, text: g.type, value: g.id}
                    })
                    setLTG(options)
                // })
            }}
            open={open}
            // trigger={<Button content='New Goal' compact primary/>}
            dimmer='inverted'
            data-testid='newGoalModal'
            trigger={
                <Icon.Group size='huge' onClick={toggleTriggerColor}>
                    <Icon color={triggerColor[0]} name='plus' />
                    <Icon color={triggerColor[1]} name={'check circle'} corner='top right' />
                </Icon.Group>
            }
        >
            <Modal.Content>
            <Form onSubmit={ e => {
                e.preventDefault();

                // coalate form data into new goal and temp filler for Gaols view
                const newGoal = compileNewGoal(formData)
                console.log(newGoal)

                //send goal data to database
                createGoal(newGoal)
                    .then(goal => {
                        dispatch({type:'addGoal', data: goal})
                        console.log('goal returned from server:',goal)
                    })
                    .then(()=>{
                        console.log(store.filter.filteredLongTermGoals)
                        dispatch({type: 'setFilter', data: store.filter})
                    })
                    .catch(e => console.error(e.message))
                    
                    setOpen(false)
                    toggleTriggerColor()
                    setFormData({})
                }}>
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
                                placeholder='days/weeks...'
                                onChange={handleDropdown}
                                required
                                />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Group>
                    <Button
                        negative
                        content='cancel'
                        compact
                        onClick={()=> {
                            setFormData({})
                            toggleTriggerColor()
                            setOpen(false)
                        }}
                    />
                    <Button compact content='submit' positive />

                </Form.Group>
            </Form>
            </Modal.Content>
        </Modal>
    )
}
