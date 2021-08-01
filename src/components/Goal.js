import React from 'react'
import { Header, List, Card, Label, Icon, Container } from 'semantic-ui-react'

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
                    {/* Fix hard coded colour background to be based on category. This could mean adding colour variables
                        for categories and aligning them with utility function or `Styled Components`? */}
                    <Card fluid style={{padding:'1rem',background:'#f2711c'}} data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between',color:'#fff'}} >
                            <Header.Content>Events</Header.Content>
                            <Icon name='add' link size='large' />
                        </Header>
                            {events.length < 1 ? 
                                <Container style={{color:'#fff'}}>You have no events. Add a new task to start kicking this goal!</Container>
                            :
                                <List selection>
                                    {events.map( event =>
                                        // TODO: abstract this key to a helper function.
                                        <Card as={List.Item} fluid key={ Math.random().toString(36).substr(2, 9) } style={{background:'#fff', margin: '1rem 0'}}>
                                            <Card.Header as='h4' content={event.title} textAlign='left' />
                                        </Card>
                                        )}
                                </List>
                            }
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
