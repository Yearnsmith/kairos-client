import React, {useState} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import {data} from '../services/data'
import moment from 'moment'
import {UseGlobalState} from '../utils/stateContext'
import {createEvent} from '../services/eventServices'
import { getEventsByDate } from '../services/eventServices'

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

const defaultEvents = {
    eventTitle: "",
    eventGoals: [],
    eventDescription: "",
    eventLocation: "",
    eventURL: "",
    repeatEvent: ""
}

const defaultChecklist = {items: [], newItem: false, tempItem: ""}

export default function NewEventModal() {

    const { store, dispatch } = UseGlobalState()
    const { selectedDate } = store

    const getEventsPls = (value) => getEventsByDate(`${value}`)
    .then((response)=> dispatch({
        type: 'storeEvents',
        data: response})
    )

    const defaultDate = {
        eventDate: moment(selectedDate).format("YYYY[-]MM[-]DD"),
        startTime: moment().format("HH[:]mm"),
        endTime: moment().add(30, 'minutes').format("HH[:]mm")
        }

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
        if (!checklistItems.items.includes(checklistItems.tempItem)) {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: [...checklistItems.items, checklistItems.tempItem]}})
        setAddChecklistItems(oldValues => {return {...oldValues, newItem: false, tempItem: ''}})
        } else {
            alert("Checklist items must be unique")
        }
       
    }

    function handleRemoveChecklistItem(item) {
        setAddChecklistItems(oldValues => 
            {return {...oldValues, items: checklistItems.items.filter(li => li !== item)}})
    }


    

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
    
    function submitEvents() {
        let data = {
            title: eventItems.eventTitle,
            description: eventItems.eventDescription,
            eventStart: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.startTime}`).format())}`,
            eventEnd: `${new Date(moment(`${eventDateTime.eventDate}T${eventDateTime.endTime}`).format())}`,
            checklist: checklistItems.items,
            location: eventItems.eventLocation,
            url: eventItems.eventURL
            // goalsId: getGoalIds(eventItems.eventGoals, goalsArray)
        }
        // console.log(data)
        // setAddChecklistItems(defaultChecklist)
        // setEventDateTime(defaultDate)
        // setEventItems(defaultEvents)
        // setOpen(false)
        if (data.title && data.description && data.eventStart && data.eventEnd) {
            createEvent(data).then((response)=> {
                if (response.error){
                    console.log(response.error.message)
                }else{
                    console.log(response)
                    setAddChecklistItems(defaultChecklist)
                    setEventItems(defaultEvents)
                    getEventsPls(selectedDate)
                    setOpen(false)
                }
            })
            
        } else {
            alert("Please fill out all required fields")
        }
    }



  return (
    <Modal  onClose={() => setOpen(false)}
            onOpen={() => {setOpen(true)
                        setEventDateTime({
                            eventDate: moment(selectedDate).format("YYYY[-]MM[-]DD"),
                            startTime: moment().format("HH[:]mm"),
                            endTime: moment().add(30, 'minutes').format("HH[:]mm")
                            })}} 
            open={open} 
            trigger={
                <Icon.Group size='huge'>
                    <Icon color={triggerColor[0]} name='plus' />
                    <Icon color={triggerColor[1]} name='calendar alternate outline' corner='top right' />
                </Icon.Group>
            }>
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
                                        defaultValue={moment(selectedDate).format("YYYY[-]MM[-]DD")} 
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, eventDate:e.target.value}})}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>From</label>
                                <Input  type="time" id="eventStartTime"
                                        name="eventStartTime" defaultValue={moment().format("HH[:]mm")}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, startTime:e.target.value}})} />  
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Until</label>
                                <Input  type="time" id="eventEndTime"
                                        name="eventEndTime" defaultValue={moment().add(30, 'minutes').format("HH[:]mm")}
                                        onChange={(e)=> setEventDateTime(oldValues => {return {...oldValues, endTime:e.target.value}})}
                                        />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Field style={{'margin-top': '10px'}}>
                    <label>Description</label>
                    <TextArea   rows={4} placeholder='Describe the event' 
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
                {checklistItems && checklistItems.items.map((item) => <p> <Checkbox checked={false} label={item}/><Icon onClick={()=> handleRemoveChecklistItem(item)} style={{'margin-left': '5px'}} name="close" /></p>)}
                <Form.Field>
                    <Input style={{'margin-top': '15px'}} icon='map marker alternate' 
                    iconPosition='left' placeholder='Add Location' onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventLocation: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <Input icon='linkify' iconPosition='left' placeholder='Add Related URL' onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventURL: e.target.value}})}/>
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
            content="Add Event"
            labelPosition='right'
            icon='checkmark'
            onClick={() => submitEvents()}
        />
        </Modal.Actions>
    </Modal>
  )
}