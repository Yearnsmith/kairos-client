import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Button, Menu, Container } from 'semantic-ui-react'
import FilterModal from './FilterModal'
import { UseGlobalState } from '../utils/stateContext'
import { getLTGoals } from '../services/lifetimeGoalServices'
import { getGoals } from '../services/goalServices'
import { getGoalColor } from '../utils/goalUtils'


export default function Goals() {

    const { store, dispatch } = UseGlobalState();
    const { filteredGoals } = store

    // moved from App.js to avoid 401 error (can't fetch messages when not logged in)
    // And automatically load goals
    useEffect( () => {
        getLTGoals()
          .then( lTGoals => {
            dispatch({
              type: "setLTGoals",
              data: lTGoals
            });
          })
          .then( () =>{
            getGoals()
              .then( goals =>{
                dispatch({
                  type: "setTermGoals",
                  data: goals
                });
                dispatch({
                  type: "setFilter",
                  data: store.filter
                })
              })
          })
          .catch( err => console.error(err))
    },[])

    return (
        //replace div with semantic main element. We could move the element to wrap
        // the Router in App.js, and wrap JSX in a fragment. But this is nice for testing.
        <main data-testid="goalsView" style={{display: 'flex', flexDirection:'column', alignItems:'center',justifyContent: 'flex-start'}}>
            <h2>Goals</h2>
            {/* this could be abstracted into a component */}
            <Menu borderless secondary widths={2}>
                <FilterModal />
                {/* <Button content='Filter' size='huge' compact primary /> */}
                {/* <Button content='Sort' size='huge' compact primary /> */}
                <Button
                content='All'
                size='huge'
                compact
                primary
                onClick={()=> dispatch({
                    type: 'setFilter',
                    data: {filteredLongTermGoals: [], showCompleted: true, showActive: true}
                    })}
                />
            </Menu>
            {/*id subject to change. This wraps all goal elements, and gives it an accessible
            role of `list` for screen readers. selection prop gives each list item a pointer
        on hover, and visual feedback when clicked*/}
            <List selection inverted id="goalPane">
                {/* map over termGoals prop and extract data. Replace <List.Item> with
                <Goal /> component once it's built out.*/}
                {store.termGoals.length > 0 ? 
                    filteredGoals.map( goal =>
                        // Semantic UI list item
                        <List.Item as={ Link } to={`./goals/${goal.id}`}  key={goal.title} style={{maxWidth: '800px'}}>
                            {/* Semantic UI Segment allows for a coloured card-like component.
                            We could possibly modify List.Item to take a background colour if
                            we want to edit the Less styles. But this works for now.*/}
                            <Segment inverted color={ getGoalColor(goal.lTGoalsId[0].type).color } >
                                <List.Content>
                                    <List.Header as='h3'>{goal.title}</List.Header>
                                </List.Content>
                            </Segment>
                        </List.Item>
                )
                : 
                    <Container>You have no goals. Add a new task to start kicking your lifetime goals!</Container> }
            </List>
        </main>
    )
}
