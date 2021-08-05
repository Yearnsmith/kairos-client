import React from 'react'
import {Header, Segment, Button, Container} from 'semantic-ui-react'
import Calendar from 'react-calendar'
import '../css/Calendar.css';

export default function MonthlyEventsView() {
    return (
        <main>
            
            <Header as='h1' style={{'padding-top': '20px', 'padding-left': '20px', 'padding-bottom': '5px'}}>kairos.</Header>
            <Container style={{display: 'flex', justifyContent: 'center', 'padding-bottom': '8px'}}>
            <Button.Group compact>
            <Button active>Monthly</Button>
            <Button>Weekly</Button>
            </Button.Group>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center',
                            'padding-top': '10px', 'padding-left': '5%', 'padding-right': '5%'}}>
            <Calendar onChange={(value, event) => console.log(value)}/>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center',
                            'padding-top': '10px', 'padding-left': '5%', 'padding-right': '5%'}}>
            content
            </Container>
            

                
            
        </main>
    )
}
