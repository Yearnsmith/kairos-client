import React, {useState, useEffect} from 'react'
import {Container, Accordion, Icon, Checkbox, Divider, Label} from 'semantic-ui-react'
import {UseGlobalState} from '../utils/stateContext'
import {getGoals} from '../services/goalServices'
import moment from 'moment'
import EditEventModal from './EditEventModal'




export default function ExpandableEvents () {
    
    // Set which event is expanded by default (useState = "" is all collapsed, 0 is first expanded etc.)
    const [activeIndex, setActiveIndex] = useState(0)
    const { store, dispatch } = UseGlobalState()
    const { storedEvent, termGoals } = store
    
    useEffect(() => {
        getGoals()
            .then( goals =>{
                dispatch({
                    type: "setTermGoals",
                    data: goals
                })
              })
        
            }
    ,[])

    const expandCollapse = (titleProps) => {
        (activeIndex === titleProps.index) ? setActiveIndex('') :
        setActiveIndex(titleProps.index)
    }
    
    console.log(storedEvent)
    
    if (typeof(storedEvent) !== 'undefined' && `${storedEvent}` !== '') {

        return (
            <Container style={{display: 'flex', justifyContent: 'center', 'margin-top':'17px', marginBottom:'20px'}}>
            <Accordion styled defaultActiveIndex={activeIndex}>
                {storedEvent.map( (event,index) => 
                        <>
                        <Accordion.Title 
                            index={index}
                            active={activeIndex === index}
                            onClick={(e, titleProps)=>expandCollapse(titleProps)}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{color: 'black'}}>{event.title}</div>
                                <Icon name='dropdown' />
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                {moment(event.eventStart).format('h:mm a')} - 
                                {' '}{moment(event.eventEnd).format('h:mm a')}
                                <EditEventModal eventId={event.id}/>
                                </div>
                                <div>
                                {event.goalsId.map(goal => <Label size='mini' style={{marginTop: '3px'}}>{goal.title}</Label>)}
                                </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index} style={{paddingTop:'0px'}}>
                            {event.description && <p>{event.description}</p>}
                            {event.checklist && event.checklist.map((item, index) => <p> <Checkbox checked={item.done} label={item}/></p>)}
                            {(event.location || event.url) && <Divider/> }
                            {event.location && <p>{'\u00A0'}<Icon name="map marker alternate" />{'\u00A0'}{event.location}</p>}
                            {event.url && <p>{'\u00A0'}<Icon name="linkify" />{'\u00A0'}<a href={event.url}>{event.url}</a></p>}
                        </Accordion.Content>
                        </>
                    
                )}
            </Accordion>
            </Container>
                
        )
    } else {
        return (
            <div>No events to show</div>
        )
    }
}