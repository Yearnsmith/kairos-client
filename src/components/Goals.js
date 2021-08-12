import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Button, Container } from 'semantic-ui-react'
import FilterModal from './FilterModal'
import SortGoalsModal from './SortGoalsModal'
import { UseGlobalState } from '../utils/stateContext'
import { getGoalColor, sortGoals } from '../utils/goalUtils'

export default function Goals() {
    const { store, dispatch } = UseGlobalState();
    const { filteredGoals } = store
    console.log(store.filteredGoals)

    const [sortMethod, setSortMethod] = useState('dateCreated')
    const [sortedGoals, setSortedGoals] = useState([])
  
    function handleSort(action){
      console.log('handlesort:', action)
      setSortMethod(action)
      setSortedGoals( sortGoals(filteredGoals, action) )
    }

    useEffect(() => {
      setSortedGoals(
        sortGoals(filteredGoals, sortMethod)
      )
  }, [filteredGoals, sortMethod])

    return (
        //replace div with semantic main element. We could move the element to wrap
        // the Router in App.js, and wrap JSX in a fragment. But this is nice for testing.
        <main data-testid="goalsView" style={{display: 'flex', flexDirection:'column', alignItems:'center',justifyContent: 'flex-start'}}>
            <h2>Goals</h2>
            {/* this could be abstracted into a component */}
            <Button.Group compact>
              <FilterModal />
              <SortGoalsModal sortMethod={sortMethod} handleSort={handleSort} />
              <Button
              style={{textAlign: 'center'}}
              content='All'
              attached='right'
              onClick={()=> dispatch({
                  type: 'setFilter',
                  data: {filteredLongTermGoals: [], showCompleted: true, showActive: true}
                  })}
              />
            </Button.Group>

                {/* <Button content='Sort' size='huge' compact primary /> */}
            {/*id subject to change. This wraps all goal elements, and gives it an accessible
            role of `list` for screen readers. selection prop gives each list item a pointer
        on hover, and visual feedback when clicked*/}
            <List selection inverted id="goalPane">
                {/* map over termGoals prop and extract data. Replace <List.Item> with
                <Goal /> component once it's built out.*/}
                {sortedGoals.length > 0 ? sortedGoals.map( goal =>
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
