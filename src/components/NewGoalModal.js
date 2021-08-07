import React, { useState } from 'react'
import { UseGlobalState } from '../utils/stateContext'
import { Form, Modal, Button, Grid } from 'semantic-ui-react'
import pluralize from 'pluralize'

//* Set form Data
// const timePeriodOptions =[
//     {key: 'day', text: 'Day', value: 'day'},
//     {key: 'week', text: 'Week', value: 'week'},
//     {key: 'month', text: 'Month', value: 'month'},
//     {key: 'Year/s', text: 'Year', value: 'year'}
// ]
const lifeTimeGoalOptions =[
    {key: 'career', text:'Career', value:'career'},
    {key: 'lifestyle', text:'Lifestyle', value:'lifestyle'},
    {key: 'artistic', text:'Artistic', value:'artistic'},
    {key: 'physical', text:'Physical', value:'physical'}
  ]

export default function NewGoalModal() {

    const [timePeriodOptions, setTPO] = useState([
        {key: 'day', text: 'Day', value: 'day'},
        {key: 'week', text: 'Week', value: 'week'},
        {key: 'month', text: 'Month', value: 'month'},
        {key: 'Year/s', text: 'Year', value: 'year'}
    ])

    // set modal status
    const [open, setOpen] = useState(false)

    const {store, dispatch} = UseGlobalState();
    
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
    //submit form
    

    //render modal
    return (
        <Modal
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button content='New Goal' compact primary/>}
            dimmer='inverted'
            data-testid='newGoalModal'
        >
            <Modal.Content>
            <Form onSubmit={(e)=>{
                e.preventDefault();
                dispatch({type:'addGoal', data: formData})
                dispatch({type: 'setFilter', data: store.filter})
                setOpen(false)
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
                            options={lifeTimeGoalOptions}
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
                            setOpen(false)
                        }}
                    />
                    <Button compact content='submit' positive/>

                </Form.Group>
            </Form>
            </Modal.Content>
        </Modal>
    )
}
