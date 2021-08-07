import React from 'react'
import { Header, List, Label, Icon, Segment, Container } from 'semantic-ui-react'
import moment from 'moment'


export default function Goal({termGoal}) {
    if(termGoal){
        
        const {title, description, longTermGoal, timeframe, events, createdAt, editedAt, completedAt} = termGoal;
        // create human readable time from timestring
        // const goalCreated = unixTimeToLocale(createdAt);
        
        return (
            <main style={{padding:'1rem 1rem'}}>
                    {/*https://react.semantic-ui.com/elements/header/#variations-block */}
                    <Header as='h2' color='orange' block content={title}/>
                    <Segment.Group>
                        <Segment inverted color='orange' data-testid='info-card' attached='top'>
                            <Container>
                                <Header as='h3' inverted>
                                    <Header.Content>Description</Header.Content>
                                </Header>
                                {/* <Card.Description data-testid='info-card-description' textAlign='left'> */}
                                    <p>{description}</p>
                                {/* </Card.Description> */}
                                <Label.Group style={{display:'flex',justifyContent:'space-between'}}>
                                    <Label style={{background: '#2185d0', color:'#fff'}}>{longTermGoal}</Label>
                                    <Label style={{background: '#2185d0', color:'#fff'}}>{timeframe}</Label>
                                </Label.Group>
                            </Container>
                        </Segment>
                        <Segment
                            tertiary
                            attached='bottom'
                            inverted
                            color='orange'
                            style={{fontSize:'.8em', padding:'.5em'}}>
                            <Container style={{color:'#444'}}>Created: {moment(createdAt).format('LL, [at] LT')}</Container>
                            <Container style={{color:'#444'}}>{completedAt ?
                                `Completed: ${moment(completedAt).format('LL, [at] LT')}`
                            :
                                'Active'}</Container>
                        </Segment>
                    </Segment.Group>
                    <Segment inverted color='orange' data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between'}} >
                            <Header.Content>Events</Header.Content>
                            <Icon name='add' link size='large' className='ui right floated'/>
                        </Header>
                        <List selection>
                            {events.length === 0 ? 
                                <Container style={{color:'#fff'}}>You have no events. Add a new task to start kicking this goal!</Container>
                            :
                                events.map( event =>
                                    <Segment clearing as={List.Item} key={event.title} style={{background:'#fff', margin: '1rem 0'}}>
                                        <Header as='h4' floated='left' content={event.title} textAlign='left' />
                                        {event.completedAt ? <Icon name="check" size='large' color='green' className='ui right floated' /> : null}
                                    </Segment>
                            )}
                        </List>
                    </Segment>
                </main>
        );
    }else{
        return(
            <main>
                <p>Sorry, can't find that goal.</p>
        </main>
        );
    }
}
