import React, {useState} from 'react'
import {Container, Accordion, Icon, Checkbox, Divider} from 'semantic-ui-react'
import {UseGlobalState} from '../utils/stateContext'
import { getEventsByDate } from '../services/eventServices'
import {response} from '../sampledata/events' // to be deleted




export default function ExpandableEvents () {
    
    // Set which event is expanded by default (useState = "" is all collapsed, 0 is first expanded etc.)
    const [activeIndex, setActiveIndex] = useState(0)
    const { store } = UseGlobalState()
    const { selectedDate } = store

    console.log(selectedDate)

    // FOLLOWING CODE FOR API INTEGRATION
    // getEventsByDate({date: `${Date.parse({selectedDate})}`}).then((response)=> {
    //     if (response.error){
    //         console.log(response.error.message)
    //         return (<div>{response.error.message}</div>)
    //     }else {
    //         console.log(response)
    //         const events = response.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    //         // code in main return block goes here
    //     }

    const expandCollapse = (titleProps) => {
        (activeIndex === titleProps.index) ? setActiveIndex('') :
        setActiveIndex(titleProps.index)
    }

    const events = response.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) // to be deleted


    return (
        <Container style={{'margin-top':'17px', 'margin-bottom':'20px'}}>
        {/* {selectedDate} */}
        <Accordion styled defaultActiveIndex={activeIndex}>
            {events.map( (event,index) => 
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
                            {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                        {event.description && <p>{event.description}</p>}
                        {event.checklist && event.checklist.map(item => <p><Checkbox label={item}/></p>)}
                        <Divider/>
                        {event.location && <p>{'\u00A0'}<Icon name="map marker alternate" />{'\u00A0'}{event.location}</p>}
                        {event.location && <p>{'\u00A0'}<Icon name="linkify" />{'\u00A0'}<a href={event.url}>{event.url}</a></p>}
                    </Accordion.Content>
                    </>
                
            )}
        </Accordion>
        </Container>
            
    )
}