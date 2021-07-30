import React, { useEffect, useState } from 'react'
import { Header, List, Card, Label, Icon } from 'semantic-ui-react'

export default function Goal({termGoal}) {
    
    const {title, description, longTermGoal, timeframe, events} = termGoal;

    return (
        <>
            {/*https://react.semantic-ui.com/elements/header/#variations-block */}
            <Header as='h2' block content={title}/>
            <Card color='orange' fluid data-testid='info-card'>
                <Card.Content>
                    <Card.Header as='h3'>Description</Card.Header>
                    <Card.Description data-testid='info-card-description' textAlign='left'>
                        {description}
                    </Card.Description>
                    <Label style={{background: '#2185d0', color:'#fff'}}>{longTermGoal}</Label>
                    <Label style={{background: '#2185d0', color:'#fff'}}>{timeframe}</Label>
                </Card.Content>
            </Card>
            <Card color='orange' fluid data-testid='events-card'>
                <List selection>
                    {events.map( event =>
                        <Card as={List.Item} fluid key={event.title}>
                            <Card.Header as='h3' content={event.title} textAlign='left' />
                        </Card>
                    )}
                </List>

            </Card>
        </>
    )
}
