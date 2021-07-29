import React from 'react'
import { Button } from 'semantic-ui-react'

export default function Goal({termGoals}) {

    return (
        //replace div with semantic main element. We could move the element to wrap
        // the Router in App.js, and wrap JSX in a fragment. But this is nice for testing.
        <main data-testid="goalsView">
            <h2>Goals</h2>
            {/* this could be abstracted into a component */}
            <div role='menu'>
                <Button content='Filter' size='huge' compact primary />
                <Button content='Sort' size='huge' compact primary />
                <Button content="All" size='huge' compact primary />
            </div>
            {/*id subject to change. This wraps all goal elements*/}
            <div id="divPane">
                {/* map over termGoals prop and extract data. Replace div with
                    <Goal /> component once it's built out.*/}
                {termGoals.map( goal =>
                    <div key={goal.title}>
                        <h3>{goal.title}</h3>
                    </div>)}
            </div>
        </main>
    )
}
