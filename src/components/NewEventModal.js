import React, {useState} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import {data} from '../services/data'
import moment from 'moment'
import {UseGlobalState} from '../utils/stateContext'

let goalsArray = []
for (const goal of data.termGoals) {
    goalsArray.push({title: goal.title, id: goal.id})
}
goalsArray = goalsArray.map((goal, index) => ({key: index, text: goal.title, value: goal.id}))

const repeatOptions = [
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
  ]

export default function NewEventModal() {

    const { store } = UseGlobalState()
    const { selectedDate } = store

    const [open, setOpen] = useState(false)
    const [checklistItems, setAddChecklistItems] = useState({items: [], newItem: false, tempItem: ""})
    const [eventDateTime, setEventDateTime] = useState({
        eventDate: selectedDate,
        startTime: moment().format("HH[:]mm"),
        endTime: moment().add(30, 'minutes').format("HH[:]mm")
        })
    const [eventItems, setEventItems] = useState({
        eventTitle: "",
        eventGoals: [],
        eventDescription: "",
        eventLocation: "",
        eventURL: "",
        repeatEvent: ""
    })

    function getGoalIds (eventGoals, goalsArray){
        let idArray = []
        for (const goal of goalsArray) {
            if(eventGoals.includes(goal.text)) {
                idArray.push(goal.value)
            }
        }
        return idArray
    }

    function handleNewChecklistItem() {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: [...checklistItems.items, checklistItems.tempItem]}})
        setAddChecklistItems(oldValues => {return {...oldValues, newItem: false, tempItem: ''}})
        console.log(checklistItems.items)
    }

    function handleRemoveChecklistItem(item) {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: checklistItems.items.filter(li => li !== item)}})
    }


    const eventGoalIds = getGoalIds(eventItems.eventGoals, goalsArray)

    function handleSelectBox(e){
        if(e.target.className === 'delete icon'){
          setEventItems({
            ...eventItems,
            eventGoals: eventItems.eventGoals.filter( item => {
              return item !== e.target.parentNode.innerText
            })
          });
        }else(
          setEventItems({
            ...eventItems,
            eventGoals: [...eventItems.eventGoals,(e.target.textContent)]
          })
        );
      }
        // function handleCheckBoxes(e){
        //   console.log(e.target.checked)
        //   setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.checked
        //   })
        // }



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
                    <Input  size="big" placeholder='New Event Title' 
                            onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventTitle: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <label>Related Goals</label>
                    <Dropdown   fluid multiple search selection 
                                placeholder="Related Goals" options={goalsArray}
                                onChange={handleSelectBox}/>
                </Form.Field>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>Date</label>
                                <Input  type="date" id="eventDate" name="eventDate" 
                                        defaultValue={moment(eventDateTime.eventDate).format("YYYY[-]MM[-]DD")} 
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, eventDate:e.value}})}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>From</label>
                                <Input  type="time" id="eventStartTime"
                                        name="eventStartTime" defaultValue={moment().format("HH[:]mm")}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, eventStartTime:e.target.value}})} />  
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Until</label>
                                <Input  type="time" id="eventEndTime"
                                        name="eventEndTime" defaultValue={moment().add(30, 'minutes').format("HH[:]mm")}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, eventEndTime:e.target.value}})}
                                        />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Field style={{'margin-top': '10px'}}>
                    <label>Description</label>
                    <TextArea rows={4} placeholder='Describe the event' />
                </Form.Field>
                {!checklistItems.newItem && <Button compact onClick={() => setAddChecklistItems(oldValues => {return {...oldValues, newItem: true}})}>
                    <Icon name="plus square outline"/> Add Checklist Item
                </Button> }
                
                {checklistItems.newItem && <> <div style={{'margin-top': '5px', 'margin-bottom': '5px'}}> <Input onChange={(e)=> setAddChecklistItems(oldValues => {return {...oldValues, tempItem: e.target.value}})} size="mini" placeholder="New Checklist Item"/>
                </div>
                <Button onClick={()=> handleNewChecklistItem()} size="mini">Add</Button>
                </> }
                {checklistItems && checklistItems.items.map((item) => <p> <Checkbox checked={false} label={item}/><Icon onClick={()=> handleRemoveChecklistItem(item)} style={{'margin-left': '5px'}} name="close" /></p>)}
                <Form.Field>
                    <Input style={{'margin-top': '15px'}} icon='map marker alternate' 
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
            content="Add Event"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
        />
        </Modal.Actions>
    </Modal>
  )
}