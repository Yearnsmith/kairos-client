import React, {useState, useEffect} from 'react'
import {Container, Accordion, Icon, Checkbox, Divider, Label, Header} from 'semantic-ui-react'
import {UseGlobalState} from '../utils/stateContext'
import {getGoals} from '../services/goalServices'
import {updateEvent} from '../services/eventServices'
import {getURL} from '../utils/eventUtils'
import moment from 'moment'
import EditEventModal from './EditEventModal'
import {getGoalColor} from '../utils/goalUtils'



export default function ExpandableEvents () {
    
    // Set which event is expanded by default (useState = "" is all collapsed, 0 is first expanded etc.)
    const [activeIndex, setActiveIndex] = useState(0)
    const { store, dispatch } = UseGlobalState()
    const { storedEvent } = store
    
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
    
    console.log(activeIndex)
    
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
                                {(event.goalsId[0]) ? event.goalsId.map(goal => <Label size='tiny' color={getGoalColor(goal.lTGoalsId[0].type).color} style={{marginTop: '3px'}}>{goal.title}</Label>) : ""}
                                </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index} style={{paddingTop:'0px'}}>
                            {event.description && <p>{event.description}</p>}
                            {event.checklist && event.checklist.map((item, index) => 
                            <p> <Checkbox defaultChecked={item.checked} label={item.title} 
                            onChange={ ()=> {event.checklist[`${index}`] = {title: item.title, checked: !item.checked}
                                            updateEvent({checklist: event.checklist}, event.id)
                                            }       
                            }/></p>)}
                            {(event.location || event.url) && <Divider/> }
                            {event.location && <p>{'\u00A0'}<Icon name="map marker alternate" />{'\u00A0'}{event.location}</p>}
                            {event.url && <p>{'\u00A0'}<Icon name="linkify" />{'\u00A0'}<a href={`https://${getURL(event.url)}`} target="_blank" rel="noreferrer" >{event.url}</a></p>}
                        </Accordion.Content>
                        </>
                    
                )}
            </Accordion>
            </Container>
                
        )
    } else {
        return (
            <Container style={{display: 'flex', flexDirection:'column', justifyContent: 'center', paddingTop:'18px'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom:'17px'}}>
            <Header>No Events To Display</Header>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '17px'}}>
            <Icon size="huge" name="calendar outline" />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>
            <Header >Try Creating One</Header>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Icon size="big" name="long arrow down" />
            </div>
            </Container>
        )
    }
}