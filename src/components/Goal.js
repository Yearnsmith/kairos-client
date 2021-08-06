import React from 'react'
import { Header, List, Card, Label, Icon, Segment, Container } from 'semantic-ui-react'
import { unixTimeToLocale } from '../utils/goalUtils';

export default function Goal({termGoal}) {
    if(termGoal){

        const {title, description, longTermGoal, timeframe, events, createdAt, editedAt} = termGoal;
        // create human readable time from timestring
        const goalCreated = unixTimeToLocale(createdAt);
        
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
                        <Segment compact secondary attached='bottom' inverted color='orange' className='extra'>
                            Created on: {goalCreated.timeDate}
                        </Segment>
                    </Segment.Group>
                    <Segment fluid inverted color='orange' data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between'}} >
                            <Header.Content>Events</Header.Content>
                            <Icon name='add' link size='large' className='ui right floated'/>
                        </Header>
                        <List selection>
                            {events.length === 0 ? 
                                <Container style={{color:'#fff'}}>You have no events. Add a new task to start kicking this goal!</Container>
                            :
                                events.map( event =>
                                    <Card as={List.Item} fluid key={event.title} style={{background:'#fff', margin: '1rem 0'}}>
                                        <Card.Header as='h4' content={event.title} textAlign='left' />
                                    </Card>
                            )}
                        </List>
                    </Segment>
                </main>
        );
    }else{
        return(
            <main>
                <p>Sorry, can't find that message.</p>
        </main>
        );
    }
}
