import React from 'react'
import {Header, Button, Container} from 'semantic-ui-react'
import Calendar from 'react-calendar'
import ExpandableEvents from './ExpandableEvents'
import '../css/Calendar.css';
import moment from 'moment'
import { getEventsByDate } from '../services/eventServices'
import {UseGlobalState} from '../utils/stateContext'


export default function MonthlyEventsView({history}) {


    const { store, dispatch } = UseGlobalState()
    const { selectedDate } = store

    const storeDate = function (value) {
        dispatch({
            type: 'setDate',
            data: value
        })
    }

    const getEventsPls = (value) => {
        console.log(value)
        getEventsByDate(`${value}`)
        .then((response)=> dispatch({
            type: 'storeEvents',
            data: response})
        )
        }

    return (
        <main>
            
            <Header as='h1' style={{'padding-top': '20px', 'padding-left': '20px', 'padding-bottom': '5px'}}>kairos.</Header>
            <Container style={{display: 'flex', justifyContent: 'center', 'padding-bottom': '8px'}}>
                <Button.Group compact>
                    <Button active>Monthly</Button>
                    <Button onClick={() => history.push("/weekly_events")}>Weekly</Button>
                </Button.Group>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center',
                            'padding-top': '10px', 'padding-left': '5%', 'padding-right': '5%'}}>
                <Calendar value={new Date(selectedDate)} onChange={(value) => {storeDate(`${value}`)
            getEventsPls(moment(value).format())}}/>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center', 'border-top': '.5px solid rgba(0, 0, 0, 0.226)',
                            'margin-top': '10px'}}>
                <ExpandableEvents />
            </Container>
            

                
            
        </main>
    )
}
