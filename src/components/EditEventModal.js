import React, {useState, useEffect} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import moment from 'moment'
import {UseGlobalState} from '../utils/stateContext'
import {getEventsById, updateEvent, deleteEvent} from '../services/eventServices'
import { getEventsByDate } from '../services/eventServices'
import { getGoals } from '../services/goalServices'


const repeatOptions = [
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
  ]

const defaultChecklist = {items: [], newItem: false, tempItem: ""}

export default function EditEventModal({eventId}) {

    const { store, dispatch } = UseGlobalState()
    const { selectedDate, termGoals } = store

    const getEventsPls = (value) => getEventsByDate(`${value}`)
    .then((response)=> dispatch({
        type: 'storeEvents',
        data: response})
    )

    const defaultEvents = {
        eventTitle: "",
        eventGoals: [],
        eventDescription: "",
        eventLocation: "",
        eventURL: "",
        repeatEvent: ""
    }

    const defaultDate = {
        eventDate: "",
        startTime: "",
        endTime: ""
        }

    useEffect(() => {
        getGoals()
            .then( goals =>{
                dispatch({
                    type: "setTermGoals",
                    data: goals
                })
              })
        getEventsById(eventId)
            .then(event => {
                defaultEvents.eventTitle = event.title
                // defaultEvents.eventGoals = event.goalsIdevent.goalsId.map((goal, index) => ({key: goal.title, text: goal.title, value: goal.id}))
                defaultEvents.eventDescription = event.description
                defaultEvents.eventLocation = event.location
                defaultEvents.eventURL = event.url
                defaultDate.eventDate = moment(event.eventStart).format("YYYY[-]MM[-]DD")
                defaultDate.startTime = moment(event.eventStart).format("HH[:]mm")
                defaultDate.endTime = moment(event.eventEnd).format("HH[:]mm")
                defaultChecklist.items = event.checklist
                console.log(defaultEvents.eventGoals)
            })
    },[])
    

    const [open, setOpen] = useState(false)
    const [checklistItems, setAddChecklistItems] = useState(defaultChecklist)
    const [eventDateTime, setEventDateTime] = useState(defaultDate)
    const [eventItems, setEventItems] = useState(defaultEvents)

    const [triggerColor, setTriggerColor] = useState(['grey', 'grey'])
    const toggleTriggerColor = ()=>{
        setTriggerColor(
            triggerColor.includes('grey') ? ['blue', 'green'] : ['grey', 'grey']
            )
    }
    
    const goalsArray = termGoals.map((goal, index) => ({key: index, text: goal.title, value: goal.id}))

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
        let mappedChecklist = checklistItems.items.map(item => item.title)
        if (!mappedChecklist.includes(checklistItems.tempItem) && checklistItems.tempItem !== '') {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: [...checklistItems.items, {title: checklistItems.tempItem, checked: false}]}})
        setAddChecklistItems(oldValues => {return {...oldValues, newItem: false, tempItem: ''}})
        } else {
            alert("Checklist items must be unique and contain at least one character")
        }
       
    }

    function handleRemoveChecklistItem(item) {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: checklistItems.items.filter(li => li.title !== item)}})
    }
    
    function submitEvents() {
        let data = {
            title: eventItems.eventTitle,
            description: eventItems.eventDescription,
            eventStart: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.startTime}`).format())}`,
            eventEnd: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.endTime}`).format())}`,
            checklist: checklistItems.items,
            location: eventItems.eventLocation,
            url: eventItems.eventURL,
            goalsId: getGoalIds(eventItems.eventGoals, goalsArray)
        }
        if (data.title && data.description && data.eventStart && data.eventEnd) {
            updateEvent(data, eventId).then((response)=> {
                if (response.error){
                    console.log(response.error.message)
                }else{
                    getEventsPls(selectedDate)
                    setOpen(false)
                }
            })
            
        } else {
            alert("Please fill out all required fields")
        }
    }


  return (
    <Modal  onClose={() => {setOpen(false)
                            toggleTriggerColor()
                            }}
            onOpen={() => {setOpen(true)}} 
            open={open} 
            trigger={
                    <Icon name='edit outline' color="grey" />
            }>
        <Modal.Header>Create New Event</Modal.Header>
        <Icon style={{'padding-top': '7px',
                    'padding-right': '5px'}}name='close' onClick={() => setOpen(false)}/>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <Input  size="big" placeholder='New Event Title' defaultValue={eventItems.eventTitle} 
                            onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventTitle: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    {/* <label>Related Goals</label>
                    <Dropdown   fluid multiple search selection
                                options={goalsArray}
                                defaultValue={eventItems.eventGoals}
                                onChange={handleSelectBox}
                                /> */}
                </Form.Field>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>Date</label>
                                <Input  type="date" id="eventDate" name="eventDate" 
                                        defaultValue={eventDateTime.eventDate} 
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, eventDate:e.target.value}})}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>From</label>
                                <Input  type="time" id="eventStartTime"
                                        name="eventStartTime" defaultValue={eventDateTime.startTime}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, startTime:e.target.value}})} />  
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Until</label>
                                <Input  type="time" id="eventEndTime"
                                        name="eventEndTime" defaultValue={eventDateTime.endTime}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, endTime:e.target.value}})}
                                        />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Field style={{'margin-top': '10px'}}>
                    <label>Description</label>
                    <TextArea   rows={4} placeholder='Describe the event'
                                defaultValue={eventItems.eventDescription} 
                                onChange={(e) => setEventItems(oldValues => 
                                {return {...oldValues, eventDescription: e.target.value}})}/>
                </Form.Field>
                {!checklistItems.newItem && <Button compact onClick={() => setAddChecklistItems(oldValues => 
                                                                        {return {...oldValues, newItem: true}})}>
                    <Icon name="plus square outline"/> Add Checklist Item
                </Button> }
                
                {checklistItems.newItem && <> <div style={{'margin-top': '5px', 'margin-bottom': '5px'}}> <Input onChange={(e)=> setAddChecklistItems(oldValues => {return {...oldValues, tempItem: e.target.value}})} size="mini" placeholder="New Checklist Item"/>
                </div>
                <Button onClick={()=> handleNewChecklistItem()} size="mini">Add</Button>
                </> }
                {checklistItems.items && checklistItems.items.map((item) => <p> <Checkbox checked={item.checked} label={item.title}/><Icon onClick={()=> handleRemoveChecklistItem(item.title)} style={{'margin-left': '5px'}} name="close" /></p>)}
                <Form.Field>
                    <Input style={{'margin-top': '15px'}} icon='map marker alternate' 
                    iconPosition='left' placeholder='Add Location' defaultValue={eventItems.eventLocation} onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventLocation: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <Input icon='linkify' iconPosition='left' placeholder='Add Related URL' defaultValue={eventItems.eventURL} onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventURL: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <label>Repeat Event:</label>
                    <div style={{'max-width': '100%'}}>
                        <Dropdown clearable options={repeatOptions} 
                        selection placeholder="No Repetition" onChange={(e) => setEventItems(oldValues => {return {...oldValues, repeatEvent:e.target.textContent}})}/>
                    </div>
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button
            content="Delete Event"
            labelPosition='right'
            icon='delete'
            onClick={() => {deleteEvent(eventId)
                            setOpen(false)
                            getEventsPls(selectedDate)
                            }}
        />
        <Button
            content="Edit Event"
            labelPosition='right'
            icon='checkmark'
            onClick={() => submitEvents()}
        />
        </Modal.Actions>
    </Modal>
  )
}