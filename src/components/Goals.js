import React from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Button } from 'semantic-ui-react'
import FilterModal from './FilterModal'
import { UseGlobalState } from '../utils/stateContext'

export default function Goal() {
    const { store, dispatch } = UseGlobalState();
    const { termGoals} = store
    return (
        //replace div with semantic main element. We could move the element to wrap
        // the Router in App.js, and wrap JSX in a fragment. But this is nice for testing.
        <main data-testid="goalsView">
            <h2>Goals</h2>
            {/* this could be abstracted into a component */}
            <div role='menu'>
                <FilterModal />
                {/* <Button content='Filter' size='huge' compact primary /> */}
                <Button content='Sort' size='huge' compact primary />
                <Button content='All' size='huge' compact primary />
            </div>
            {/*id subject to change. This wraps all goal elements, and gives it an accessible
            role of `list` for screen readers. selection prop gives each list item a pointer
            on hover, and visual feedback when clicked*/}
            <List selection inverted id="goalPane">
                {/* map over termGoals prop and extract data. Replace <List.Item> with
                <Goal /> component once it's built out.*/}
                {termGoals.map( goal =>
                    // Semantic UI list item
                    <List.Item as={ Link } to={`./goals/${goal.id}`}  key={goal.title}>
                        {/* Semantic UI Segment allows for a coloured card-like component.
                        We could possibly modify List.Item to take a background colour if
                        we want to edit the Less styles. But this works for now.*/}
                        <Segment inverted className={`${goal.color}`}>
                            <List.Content>
                                <List.Header as='h3'>{goal.title}</List.Header>
                            </List.Content>
                        </Segment>
                    </List.Item>
                )}
            </List>
        </main>
    )
}
