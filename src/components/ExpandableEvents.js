import React, {useState} from 'react'
import {Container, Accordion, Icon, Checkbox, Divider} from 'semantic-ui-react'
import {UseGlobalState} from '../utils/stateContext'
import moment from 'moment'




export default function ExpandableEvents () {
    
    // Set which event is expanded by default (useState = "" is all collapsed, 0 is first expanded etc.)
    const [activeIndex, setActiveIndex] = useState(0)
    const { store } = UseGlobalState()
    const { storedEvent } = store
    
    

    const expandCollapse = (titleProps) => {
        (activeIndex === titleProps.index) ? setActiveIndex('') :
        setActiveIndex(titleProps.index)
    }

    

    //const events =  (storedEvent !== []) ? storedEvent.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : console.log('hi')// to be deleted
    //console.log(storedEvent)
    
    if (typeof(storedEvent) !== 'undefined' && `${storedEvent}` !== '') {

        return (
            <Container style={{display: 'flex', justifyContent: 'center', 'margin-top':'17px', 'margin-bottom':'20px'}}>
            <Accordion styled defaultActiveIndex={activeIndex}>
                {storedEvent.map( (event,index) => 
                        <>
                        <Accordion.Title 
                            index={index}
                            active={activeIndex === index}
                            onClick={(e, titleProps)=>expandCollapse(titleProps)}
                            >
                                <div style={{'display': 'flex', 'justify-content': 'space-between'}}>
                                <div style={{'color': 'black'}}>{event.title}</div>
                                <Icon name='dropdown' />
                                </div>
                                {moment(event.eventStart).format('h:mm a')} - 
                                {' '}{moment(event.eventEnd).format('h:mm a')}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index}>
                            {event.description && <p>{event.description}</p>}
                            {event.checklist && event.checklist.map((item, index) => <p> <Checkbox checked={item.done} label={item}/></p>)}
                            <Divider/>
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