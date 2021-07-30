import React, { useEffect, useState } from 'react'
import { Header, List, Card, Label } from 'semantic-ui-react'

export default function Goal({termGoal}) {
    
    const {title, description, longTermGoal, timeframe} = termGoal;

    return (
        <>
            {/*https://react.semantic-ui.com/elements/header/#variations-block */}
            <Header as='h2' block content={title} />
            <Card data-testid='info-card'>
                <Card.Content>
                    <Card.Header as='h3'>Description</Card.Header>
                    <Card.Description data-testid='info-card-description'>
                        {description}
                    </Card.Description>
                    <Label>{longTermGoal}</Label>
                    <Label>{timeframe}</Label>
                </Card.Content>
            </Card>
        </>
    )
}
