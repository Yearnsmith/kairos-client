import React, {useState, useEffect} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import moment from 'moment'
import {UseGlobalState} from '../utils/stateContext'
import {getEventsById, updateEvent, deleteEvent} from '../services/eventServices'
import { getEventsByDate } from '../services/eventServices'
import { getGoals } from '../services/goalServices'
import {repeatOptions, defaultChecklist, defaultDate} from '../utils/eventUtils'

export default function EditEventModal({eventId, relatedGoal}) {

    // Get set and dispatch functions to access reducer and global state
    const { store, dispatch } = UseGlobalState()

    // Get selectedDate and termGoals from global state
    const { selectedDate, termGoals } = store

    // loads all events on the same day as the input date and stores them to the state
    const getEventsPls = (value) => getEventsByDate(`${value}`)
    .then((response)=> dispatch({
        type: 'storeEvents',
        data: response})
    )

    // defines blank values for events (minus related goals)
    const defaultEvents = {
        eventTitle: "",
        eventGoals: [relatedGoal],
        eventDescription: "",
        eventLocation: "",
        eventURL: "",
        repeatEvent: ""
    }

    // Gets goals from the server and dispatches them to the state
    useEffect(() => {
        getGoals()
            .then( goals =>{
                dispatch({
                    type: "setTermGoals",
                    data: goals
                })
              })
    // Requests event data for selected event from the server and saves it to the defaultEvent, defaultDate & defaultChecklist objects
        getEventsById(eventId)
            .then(event => {
                defaultEvents.eventTitle = event.title
                defaultEvents.eventGoals = event.goalsId.map(goal => goal.id)
                defaultEvents.eventDescription = event.description
                defaultEvents.eventLocation = event.location
                defaultEvents.eventURL = event.url
                defaultDate.eventDate = moment(event.eventStart).format("YYYY[-]MM[-]DD")
                defaultDate.startTime = moment(event.eventStart).format("HH[:]mm")
                defaultDate.endTime = moment(event.eventEnd).format("HH[:]mm")
                defaultChecklist.items = event.checklist
            })
    },[])
    

    // Using local state for modal open state, checklist items, event date & time and all other event items
    const [open, setOpen] = useState(false)
    const [checklistItems, setAddChecklistItems] = useState(defaultChecklist)
    const [eventDateTime, setEventDateTime] = useState(defaultDate)
    const [eventItems, setEventItems] = useState(defaultEvents)
    const { eventGoals } = eventItems

    const [triggerColor, setTriggerColor] = useState(['grey', 'grey'])
    const toggleTriggerColor = ()=>{
        setTriggerColor(
            triggerColor.includes('grey') ? ['blue', 'green'] : ['grey', 'grey']
            )
    }
    
    // maps term goals to suit the semantic-ui-react dropdown
    const goalsArray = termGoals.map((goal, index) => ({key: index, text: goal.title, value: goal.id}))
    
    // Event dropdown helper
    function handleSelectBox(e, data){
        setEventItems({
            ...eventItems,
            eventGoals: [...data.value]
          })
      }
    

    // Adds new checklist item
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

    // Removes a checklist item
    function handleRemoveChecklistItem(item) {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: checklistItems.items.filter(li => li.title !== item)}})
    }
    
    // Submits the completed items to the database
    function submitEvents() {
        let data = {
            title: eventItems.eventTitle,
            description: eventItems.eventDescription,
            eventStart: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.startTime}`).format())}`,
            eventEnd: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.endTime}`).format())}`,
            checklist: checklistItems.items,
            location: eventItems.eventLocation,
            url: eventItems.eventURL,
            goalsId: eventItems.eventGoals
        }
        // Only lets the user submit the event data if all required fields are filled
        if (data.title && data.description && data.eventStart && data.eventEnd) {
            updateEvent(data, eventId).then((response)=> {
                if (response.error){
                    console.log(response.error.message)
                }else{
                    getEventsPls(selectedDate)
                }
            })
            
        } else {
            alert("Please fill out all required fields")
        }
    }

    // EditEventModal layout below
  return (
    // Sets modal behavior
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
                {/* Related goals drop down / selector */}
                <label>Related Goals</label>
                <Dropdown   label='Related Goals' fluid multiple search selection 
                                options={goalsArray}
                                onChange={handleSelectBox} value={eventGoals}/>
                </Form.Field>
                {/* Grid contains start date, start time and end time selections */}
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>Date</label>
                                <Input  type="date" id="eventDate" name="eventDate" 
                                        defaultValue={eventDateTime.eventDate} 
                                        onChange={(e)=> setEventDateTime(oldValues => 
                                        {return {...oldValues, eventDate:e.target.value}})}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>From</label>
                                <Input  type="time" id="eventStartTime"
                                        name="eventStartTime" defaultValue={eventDateTime.startTime}
                                        onChange={(e)=> setEventDateTime(oldValues => 
                                        {return {...oldValues, startTime:e.target.value}})} />  
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Until</label>
                                <Input  type="time" id="eventEndTime"
                                        name="eventEndTime" defaultValue={eventDateTime.endTime}
                                        onChange={(e)=> setEventDateTime(oldValues => 
                                        {return {...oldValues, endTime:e.target.value}})}
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
                {/* Start of checklist */}
                {!checklistItems.newItem && <Button compact onClick={() => setAddChecklistItems(oldValues => 
                                                                        {return {...oldValues, newItem: true}})}>
                    <Icon name="plus square outline"/> Add Checklist Item
                </Button> }
                
                {checklistItems.newItem && <>   
                    <div style={{'margin-top': '5px', 'margin-bottom': '5px'}}> 
                        <Input onChange={(e)=> setAddChecklistItems(oldValues =>
                        {return {...oldValues, tempItem: e.target.value}})} 
                        size="mini" placeholder="New Checklist Item"/>
                    </div>

                <Button onClick={()=> handleNewChecklistItem()} size="mini">Add</Button>
                </> }
                {checklistItems.items && checklistItems.items.map((item) => 
                    <p> <Checkbox checked={item.checked} label={item.title}/>
                    <Icon onClick={()=> handleRemoveChecklistItem(item.title)} 
                    style={{'margin-left': '5px'}} name="close" /></p>)}
                {/* End of checklist */}
                
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
        {/* Sends request to server/database to delete event that's being edited */}
        <Button
            content="Delete Event"
            labelPosition='right'
            icon='delete'
            onClick={() => {deleteEvent(eventId).then(()=>
                {getEventsPls(selectedDate)
                setOpen(false)})
            }}
        />
        {/* Pushes changes via the submitEvents() function */}
        <Button
            content="Edit Event"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {setOpen(false)
                submitEvents()
}}
/>
        </Modal.Actions>
    </Modal>
  )
}
