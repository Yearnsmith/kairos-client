import React, { useEffect, useState } from 'react'
import { Header, List, Card } from 'semantic-ui-react'

export default function Goal({termGoal}) {
    
    const {title} = termGoal;

    console.log(termGoal)

    return (
        <>
            {/*https://react.semantic-ui.com/elements/header/#variations-block */}
            <Header as='h2' block content={title} />
            <Card data-testid='info-card'>
                <Card.Content>
                    <Card.Header as='h3'>Description</Card.Header>
                    <Card.Description>
                        
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    )
}
