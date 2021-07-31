import React from 'react'
import { Header, List, Card, Label, Icon } from 'semantic-ui-react'

export default function Goal({termGoal}) {
    if(termGoal){

        const {title, description, longTermGoal, timeframe, events} = termGoal;
        
        return (
            <main style={{padding:'1rem 1rem'}}>
                    {/*https://react.semantic-ui.com/elements/header/#variations-block */}
                    <Header as='h2' block content={title}/>
                    <Card color='orange' fluid data-testid='info-card'>
                        <Card.Content>
                            <Card.Header as='h3'>Description</Card.Header>
                            <Card.Description data-testid='info-card-description' textAlign='left'>
                                <p>{description}</p>
                            </Card.Description>
                            <Label.Group style={{display:'flex',justifyContent:'space-between'}}>
                                <Label style={{background: '#2185d0', color:'#fff'}}>{longTermGoal}</Label>
                                <Label style={{background: '#2185d0', color:'#fff'}}>{timeframe}</Label>
                            </Label.Group>
                        </Card.Content>
                    </Card>
                    <Card fluid style={{padding:'1rem',background:'#f2711c'}} color='orange' data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between',color:'#fff'}} >
                            <Header.Content>Events</Header.Content>
                            <Icon name='add' link size='large' className='ui right floated'/>
                        </Header>
                        <List selection>
                            {events.map( event =>
                                <Card as={List.Item} fluid key={event.title} style={{background:'#fff', margin: '1rem 0'}}>
                                    <Card.Header as='h4' content={event.title} textAlign='left' />
                                </Card>
                            )}
                        </List>
                    </Card>
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
