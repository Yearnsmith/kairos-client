import React, {useState} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import {data} from '../services/data'
import {UseGlobalState} from '../utils/stateContext'

let goalsArray = []
for (const goal of data.termGoals) {
    goalsArray.push(goal.title)
}
goalsArray = goalsArray.map(goal => ({key: goal, text: goal, value: goal}))

const repeatOptions = [
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
  ]

export default function NewEventModal() {

    const { store, dispatch } = UseGlobalState()
    const { selectedDate } = store

    const [open, setOpen] = useState(false)
    const [addChecklist, setAddChecklist] = useState(false)

  return (
    <Modal  onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)} 
            open={open} 
            trigger={<Button circular icon="plus"/>}>
        <Modal.Header>Create New Event</Modal.Header>
        <Icon style={{'padding-top': '7px',
                    'padding-right': '5px'}}name='close' onClick={() => setOpen(false)}/>
        <Modal.Content>
            <Form>
                <Form.Field required >
                    <Input size="big" placeholder='New Event Title'/>
                </Form.Field>
                <Form.Field>
                    <label>Related Goals</label>
                    <Dropdown   fluid multiple search selection 
                                placeholder="Related Goals" options={goalsArray}/>
                </Form.Field>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>Date</label>
                                <input  type="date" id="eventDate"
                                        name="eventDate" defaultValue="2018-06-12" />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>From</label>
                                <input  label="start"
                                        type="time" id="eventStartTime"
                                        name="eventStartTime" defaultValue="07:30" />  
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Until</label>
                                <input  type="time" id="eventEndTime"
                                        name="eventEndTime" defaultValue="08:30" />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Field style={{'margin-top': '10px'}}>
                    <label>Description</label>
                    <TextArea rows={4} placeholder='Describe the event' />
                </Form.Field>
                <div style={{'max-width': '150px', 'margin-bottom': '15px'}}>
                    <Icon name="plus square outline"/> Add Checklist Item
                </div>
                <Form.Field>
                    <Input icon='map marker alternate' 
                    iconPosition='left' placeholder='Add Location' />
                </Form.Field>
                <Form.Field>
                    <Input icon='linkify' iconPosition='left' placeholder='Add Related URL' />
                </Form.Field>
                <Form.Field>
                    <label>Repeat Event:</label>
                    <div style={{'max-width': '100%'}}>
                        <Dropdown clearable options={repeatOptions} 
                        selection placeholder="No Repetition" />
                    </div>
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button
            type='submit'
            content="Add Event"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
        />
        </Modal.Actions>
    </Modal>
  )
}