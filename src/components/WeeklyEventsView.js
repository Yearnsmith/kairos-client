import React from 'react'
import {Header, Button, Container} from 'semantic-ui-react'
import moment from 'moment'
import ExpandableEvents from './ExpandableEvents'
import '../css/Calendar.css';
import {UseGlobalState} from '../utils/stateContext'


export default function MonthlyEventsView({history}) {


    const { store, dispatch } = UseGlobalState()
    const { selectedDate } = store

    const storeDate = function (value) {
        dispatch({
            type: 'setDate',
            data: `${value}`
        })
    
    }

    // Converts selectedDate to first three letters of weekday
    const slicedWeekday = selectedDate.slice(0,3)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


    return (
        <main>
            
            <Header as='h1' style={{'padding-top': '20px', 'padding-left': '20px', 'padding-bottom': '5px'}}>kairos.</Header>
            <Container style={{display: 'flex', justifyContent: 'center', 'padding-bottom': '20px'}}>
            <Button.Group compact>
            <Button onClick={() => history.push("/monthly_events")}>Monthly</Button>
            <Button active>Weekly</Button>
            </Button.Group>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center', 'padding-bottom': '20px'}}>
            <Button.Group compact size="small">
            <Button active={slicedWeekday === 'Mon'} onClick={() => storeDate(moment().isoWeekday(1))}>Mon</Button>
            <Button active={slicedWeekday === 'Tue'} onClick={() => storeDate(moment().isoWeekday(2))}>Tue</Button>
            <Button active={slicedWeekday === 'Wed'} onClick={() => storeDate(moment().isoWeekday(3))}>Wed</Button>
            <Button active={slicedWeekday === 'Thu'} onClick={() => storeDate(moment().isoWeekday(4))}>Thu</Button>
            <Button active={slicedWeekday === 'Fri'} onClick={() => storeDate(moment().isoWeekday(5))}>Fri</Button>
            <Button active={slicedWeekday === 'Sat'} onClick={() => storeDate(moment().isoWeekday(6))}>Sat</Button>
            <Button active={slicedWeekday === 'Sun'} onClick={() => storeDate(moment().isoWeekday(7))}>Sun</Button>
            </Button.Group>
            </Container>
            <div style={{display: 'flex', justifyContent: 'center', 'font-size': '1.3em'}}>
                {moment(selectedDate).format('dddd Do MMMM YYYY')}
            </div>
            <Container style={{display: 'flex', justifyContent: 'center', 'border-top': '.5px solid rgba(0, 0, 0, 0.226)',
                            'margin-top': '5px'}}>
            <ExpandableEvents />
            </Container>
            

                
            
        </main>
    )
}
