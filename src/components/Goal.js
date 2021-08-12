import React, { useState, useEffect } from 'react'
import { Header, List, Label, Icon, Segment, Container, Button } from 'semantic-ui-react'
import moment from 'moment'
import { getGoalColor } from '../utils/goalUtils';
import { deleteGoal, getGoalById } from '../services/goalServices';
import { useParams } from 'react-router-dom';
import EditGoalModal from './EditGoalModal';
import NewEventModal from './NewEventModal';
import { UseGlobalState } from '../utils/stateContext';
export default function Goal({history}) {
    
    // get global state
    const { store, dispatch } = UseGlobalState();

    const [goal, setGoal] = useState(null)
    
    const {id} = useParams();
    
    const [goalColors, setGoalColors]=useState({color: 'black', secondary: 'black', text: 'grey'})
        const goalColor = goalColors.color
        const secondaryColor = goalColors.secondary
        const textColor = goalColors.text
    
    const [goalUpdated, setGoalUpdated] = useState(false)
            
            useEffect(()=>{
                getGoalById(id)
                .then( goal => {
                    setGoal(goal)

                    setGoalColors(
                        getGoalColor(goal.lTGoalsId[0].type)
                    )
                })
                .catch( error => console.error(error) );
        }, [id, goalColors, goalUpdated]);

        function deleteGoalHandler(){
            deleteGoal(id)
                .then( res =>{
                    dispatch({type:'removeGoal', data: id})
                    dispatch({type:'setFilter', data: store.filter})
                    history.push("/goals")
                })
        }

        console.log(goal)
        return (
            <main style={{padding:'1rem 1rem', display: 'flex', flexDirection:'column', alignItems:'center'}}>
                {goal ?
                <>
                    {/*https://react.semantic-ui.com/elements/header/#variations-block */}
                    <Header as='h2' color={goalColor} block content={goal.title}/>
                    <Segment.Group style={{minWidth: '300px', maxWidth: '500px'}}>
                        <Segment inverted color={goalColor} data-testid='info-card' attached='top'>
                            <Container style={{color: textColor}}>
                                <Header as='h3' inverted style={{color: 'inherit'}}>
                                    <Header.Content>Description</Header.Content>
                                </Header>
                                    {/* https://darioghilardi.com/handling-newlines-with-react/ */}
                                    <p style={{whiteSpace: "break-spaces"}}>{goal.description}</p>
                                <Label.Group style={{display:'flex',justifyContent:'space-between'}}>
                                    <Label style={{background: secondaryColor, color:'#444'}}>{goal.lTGoalsId[0].type}</Label>
                                    <Label style={{background: secondaryColor, color:'#444'}}>{goal.timeframe}</Label>
                                </Label.Group>
                            </Container>
                        </Segment>
                        <Segment
                            tertiary
                            attached='bottom'
                            inverted
                            color={goalColor}
                            style={{fontSize:'.8em', padding:'.5em'}}>
                            <Container style={{color:'#444'}}>Created: {moment(goal.createdAt).format('LL, [at] LT')}</Container>
                            <Container style={{color:'#444'}}>{goal.completedAt ?
                                `Completed: ${moment(goal.completedAt).format('LL, [at] LT')}`
                            :
                                `Due: ${moment(goal.endDate).format('LL')}`}</Container>
                        </Segment>
                    </Segment.Group>
                    <Segment inverted color={goalColor} style={{color: textColor, minWidth: '300px', maxWidth:'500px'}} data-testid='events-card'>
                        <Header as='h3' style={{display:'flex',justifyContent:'space-between', color: textColor}} >
                            <Header.Content>Events</Header.Content>
                            <NewEventModal setGoalUpdated={setGoalUpdated} />
                        </Header>
                        <List selection>
                            {goal.eventsId.length === 0 ? 
                                <Container style={{color: textColor}}>You have no events. Add a new task to start kicking this goal!</Container>
                            :
                                goal.eventsId.map( event =>
                                    <Segment clearing as={List.Item} key={event.title} style={{background:'#fff', margin: '1rem 0'}}>
                                        <Header as='h4' floated='left' content={event.title} textAlign='left' />
                                        {event.completedAt ? <Icon name="check" size='large' color='green' className='ui right floated' /> : null}
                                    </Segment>
                            )}
                        </List>
                    </Segment>
                        <Button.Group vertical>
                            <Button 
                                content="Achieved!"
                                icon='trophy'
                                //onClick={handleAchieve}
                            />
                            <EditGoalModal goalTitle={goal.title} setGoalUpdated={setGoalUpdated} />
                            <Button
                                content='delete'
                                icon='trash'
                                onClick={deleteGoalHandler}
                            />
                        </Button.Group>
                </>
                :
                    <Container>Sorry, can't find that message</Container>
                }
                </main>
        );
}
