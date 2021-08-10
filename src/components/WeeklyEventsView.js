import React from 'react'
import {Header, Button, Container} from 'semantic-ui-react'
import moment from 'moment'
import ExpandableEvents from './ExpandableEvents'
import {UseGlobalState} from '../utils/stateContext'
import NewEventModal from './NewEventModal'
import { getEventsByDate } from '../services/eventServices'


export default function MonthlyEventsView({history}) {


    const { store, dispatch } = UseGlobalState()
    const { selectedDate } = store
    
    const setWeekdays = {
        mon: moment().day(1).hour(0).minute(0).second(0),
        tue: moment().day(2).hour(0).minute(0).second(0),
        wed: moment().day(3).hour(0).minute(0).second(0),
        thu: moment().day(4).hour(0).minute(0).second(0),
        fri: moment().day(5).hour(0).minute(0).second(0),
        sat: moment().day(6).hour(0).minute(0).second(0),
        sun: moment().day(7).hour(0).minute(0).second(0)
    }


    const storeDate = function (value) {
        dispatch({
            type: 'setDate',
            data: value
        })
        getEventsPls(value)
    }

    const getEventsPls = (value) => {
        getEventsByDate(`${value}`)
        .then((response)=> dispatch({
            type: 'storeEvents',
            data: response})
        )
    }



    // Converts selectedDate to first three letters of weekday
    const slicedWeekday = selectedDate.slice(0,3)


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
            <Button active={slicedWeekday === 'Mon'} onClick={() => storeDate(`${setWeekdays.mon}`)}>Mon</Button>
            <Button active={slicedWeekday === 'Tue'} onClick={() => storeDate(`${setWeekdays.tue}`)}>Tue</Button>
            <Button active={slicedWeekday === 'Wed'} onClick={() => storeDate(`${setWeekdays.wed}`)}>Wed</Button>
            <Button active={slicedWeekday === 'Thu'} onClick={() => storeDate(`${setWeekdays.thu}`)}>Thu</Button>
            <Button active={slicedWeekday === 'Fri'} onClick={() => storeDate(`${setWeekdays.fri}`)}>Fri</Button>
            <Button active={slicedWeekday === 'Sat'} onClick={() => storeDate(`${setWeekdays.sat}`)}>Sat</Button>
            <Button active={slicedWeekday === 'Sun'} onClick={() => storeDate(`${setWeekdays.sun}`)}>Sun</Button>
            </Button.Group>
            </Container>
            <div style={{display: 'flex', justifyContent: 'center', 'font-size': '1.3em'}}>
                {moment(selectedDate).format('dddd Do MMMM YYYY')}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', 'margin-top': '5px'}}>
                <NewEventModal />
            </div>
            <Container style={{display: 'flex', justifyContent: 'center', 'border-top': '.5px solid rgba(0, 0, 0, 0.226)',
                            'margin-top': '5px'}}>
            <ExpandableEvents />
            </Container>
            

                
            
        </main>
    )
}
