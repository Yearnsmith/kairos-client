import React, {useState, useEffect} from 'react'
import { Button, Dropdown, Form, Modal, Checkbox, Input, Icon, TextArea, Grid } from 'semantic-ui-react'
import moment from 'moment'
import {UseGlobalState} from '../utils/stateContext'
import {createEvent} from '../services/eventServices'
import { getEventsByDate } from '../services/eventServices'
import { getGoals } from '../services/goalServices'
import { useLocation } from 'react-router-dom'

const repeatOptions = [
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
  ]
    


export default function NewEventModal(props) {

    //get the location. See if we are in goals view or an events view
    const {pathname} = useLocation();
    const thisView = pathname.split("/")[1]
    const findThisGoal = view => thisView.length > 2 ? pathname.split("/")[2] : null
    const relatedGoal = findThisGoal(thisView)
    console.log(relatedGoal)

    //set the default values for the form
    const defaultEvents = {
        eventTitle: "",
        eventGoals: relatedGoal ? [relatedGoal] : [],
        eventDescription: "",
        eventLocation: "",
        eventURL: "",
        repeatEvent: ""
    }

    const { store, dispatch } = UseGlobalState()
    const { selectedDate, termGoals } = store

    const getEventsPls = (value) => getEventsByDate(`${value}`)
    .then((response)=> dispatch({
        type: 'storeEvents',
        data: response})
    )

    useEffect(() => 
        getGoals()
            .then( goals =>{
                dispatch({
                    type: "setTermGoals",
                    data: goals
                })
              })
    ,[])

    
    const defaultChecklist = {items: [], newItem: false, tempItem: ""}
    
    const defaultDate = {
        eventDate: moment(selectedDate).format("YYYY[-]MM[-]DD"),
        startTime: moment().format("HH[:]mm"),
        endTime: moment().add(30, 'minutes').format("HH[:]mm")
    }
    
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
    
    const goalsArray = termGoals.map((goal, index) => ({key: goal.title, text: goal.title, value: goal.id}))

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

    function handleSelectBox(e, data){
        setEventItems({
            ...eventItems,
            eventGoals: [...data.value]
          })
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
            goalsId: eventItems.eventGoals
        }
        console.log(data)
        if (data.title && data.description && data.eventStart && data.eventEnd) {
            createEvent(data).then((response)=> {
                if (response.error){
                    console.log(response.error.message)
                    alert('Error creating event')
                }else{
                    console.log(response)
                    setAddChecklistItems(defaultChecklist)
                    setEventItems(defaultEvents)
                    getEventsPls(selectedDate)
                    setOpen(false)
                }
            })
        if(thisView === 'goals'){
            props.setGoalUpdated(true)
        }
            
        } else {
            alert("Please fill out all required fields")
        }
    }

    function selectTrigger(view){
        if(view === 'goals'){
            return <Icon name='plus' style={{cursor: 'pointer'}}/>
        }else if( view === 'monthly_events' || view === 'weekly_events'){
            return <Icon.Group size='huge' onClick={toggleTriggerColor}>
                        <Icon color={triggerColor[0]} name='plus' />
                        <Icon color={triggerColor[1]} name='calendar alternate outline' corner='top right' />
                    </Icon.Group>
        }
    }


  return (
    <Modal  onClose={() => {setOpen(false)
                            toggleTriggerColor()
                            setAddChecklistItems(defaultChecklist)
                            }}
            onOpen={() => {setOpen(true)
                        setEventDateTime({
                            eventDate: moment(selectedDate).format("YYYY[-]MM[-]DD"),
                            startTime: moment().format("HH[:]mm"),
                            endTime: moment().add(30, 'minutes').format("HH[:]mm")
                            })}} 
            open={open} 
            trigger={selectTrigger(thisView)}>
        <Modal.Header>Create New Event</Modal.Header>
        <Icon style={{paddingTop: '7px',
                    paddingRight: '5px'}}name='close' onClick={() => {   toggleTriggerColor()
                                                                            setOpen(false)
                                                                            setEventItems(defaultEvents)
                                                                            setAddChecklistItems(defaultChecklist)}}/>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <Input  size="big" placeholder='New Event Title (Required)' 
                            onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventTitle: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <label>Related Goals</label>
                    <Dropdown   label='Related Goals' fluid multiple search selection 
                                options={goalsArray}
                                onChange={handleSelectBox} value={eventGoals}/>
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
                <Form.Field style={{'marginTop': '10px'}}>
                    <label>Description</label>
                    <TextArea   rows={4} placeholder='Describe the event' 
                                onChange={(e) => setEventItems(oldValues => 
                                {return {...oldValues, eventDescription: e.target.value}})}/>
                </Form.Field>
                {!checklistItems.newItem && <Button compact onClick={() => setAddChecklistItems(oldValues => 
                                                                        {return {...oldValues, newItem: true}})}>
                    <Icon name="plus square outline"/> Add Checklist Item
                </Button> }
                
                {checklistItems.newItem && <> <div style={{marginTop: '5px', marginBottom: '5px'}}> <Input onChange={(e)=> setAddChecklistItems(oldValues => {return {...oldValues, tempItem: e.target.value}})} size="mini" placeholder="New Checklist Item"/>
                </div>
                <Button onClick={()=> handleNewChecklistItem()} size="mini">Add</Button>
                </> }
                {checklistItems.items && checklistItems.items.map((item) => <p> <Checkbox checked={item.checked} label={item.title}/><Icon onClick={()=> handleRemoveChecklistItem(item.title)} style={{'margin-left': '5px'}} name="close" /></p>)}
                <Form.Field>
                    <Input style={{marginTop: '15px'}} icon='map marker alternate' 
                    iconPosition='left' placeholder='Add Location' onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventLocation: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <Input icon='linkify' iconPosition='left' placeholder='Add Related URL' onChange={(e) => setEventItems(oldValues => {return {...oldValues, eventURL: e.target.value}})}/>
                </Form.Field>
                <Form.Field>
                    <label>Repeat Event:</label>
                    <div style={{maxWidth: '100%'}}>
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