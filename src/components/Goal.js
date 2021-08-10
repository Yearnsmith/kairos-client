import React from 'react'
import { Header, List, Label, Icon, Segment, Container, LabelDetail } from 'semantic-ui-react'
import moment from 'moment'
import goalColors from '../utils/lTGoalColors.json'
import { getGoalColor } from '../utils/goalUtils';


export default function Goal({termGoal}) {
    if(termGoal){
        
        const {title, description, lTGoalsId, timeframe, eventsId, createdAt, endDate, completedAt} = termGoal;
        const goalColors = getGoalColor(lTGoalsId[0].type)
        const goalColor = goalColors.color
        const secondaryColor = goalColors.secondary
        const textColor = goalColors.text
        
        return (
            <main style={{padding:'1rem 1rem'}}>
                    {/*https://react.semantic-ui.com/elements/header/#variations-block */}
                    <Header as='h2' color={goalColor} block content={title}/>
                    <Segment.Group>
                        <Segment inverted color={goalColor} data-testid='info-card' attached='top'>
                            <Container style={{color: textColor}}>
                                <Header as='h3' inverted style={{color: 'inherit'}}>
                                    <Header.Content>Description</Header.Content>
                                </Header>
                                {/* <Card.Description data-testid='info-card-description' textAlign='left'> */}
                                    <p>{description}</p>
                                {/* </Card.Description> */}
                                <Label.Group style={{display:'flex',justifyContent:'space-between'}}>
                                    <Label style={{background: secondaryColor, color:'#444'}}>{lTGoalsId[0].type}</Label>
                                    <Label style={{background: secondaryColor, color:'#444'}}>{timeframe}</Label>
                                </Label.Group>
                            </Container>
                        </Segment>
                        <Segment
                            tertiary
                            attached='bottom'
                            inverted
                            color={goalColor}
                            style={{fontSize:'.8em', padding:'.5em'}}>
                            <Container style={{color:'#444'}}>Created: {moment(createdAt).format('LL, [at] LT')}</Container>
                            <Container style={{color:'#444'}}>{completedAt ?
                                `Completed: ${moment(completedAt).format('LL, [at] LT')}`
                            :
                                `Due: ${moment(endDate).format('LL')}`}</Container>
                        </Segment>
                    </Segment.Group>
                    <Segment inverted color={goalColor} style={{color: textColor}} data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between', color: textColor}} >
                            <Header.Content>Events</Header.Content>
                            <Icon name='add' link size='large' className='ui right floated'/>
                        </Header>
                        <List selection>
                            {eventsId.length === 0 ? 
                                <Container style={{color: textColor}}>You have no events. Add a new task to start kicking this goal!</Container>
                            :
                                eventsId.map( event =>
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
