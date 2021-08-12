import React from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import ProgressModule from './ProgressModule'
import { UseGlobalState } from '../utils/stateContext'

export default function UserProfile(props) {
    const { store } = UseGlobalState();
    const { termGoals, lTGoals } = store;
    const email = jwt_decode(localStorage.getItem("jwt")).email

    const goalDisplay = termGoals.map( goal => {
        return {
            key: goal.id,
            title: goal.title,
            type: goal.lTGoalsId[0].type,
            total: goal.eventsId.length,
            complete: goal.eventsId.filter( e => e.completedAt).length
        }
    })
    //get goals that are completed
    const lTGoalDisplay = lTGoals.map( ltg => {
    
        const completedGoals = termGoals.filter(goal => {
            return goal.completedAt && goal.lTGoalsId[0].type === ltg.type ? goal.id : null
        })

        return {
            key: ltg.id,
            type: ltg.type,
            total: termGoals.filter(g => g.lTGoalsId[0].type === ltg.type).length,
            complete: completedGoals.length
        }
    })

    return (
        // create a grid that will stack on small screen sizes
        <Grid columns={3} centered stackable verticalAlign='middle' style={{paddingTop: '2rem'}}>

            <Grid.Row>
                <Grid.Column width={12} verticalAlign='right'>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='user outline' circular />
                        {email}
                    </Header>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <span
                            onClick={() => {
                                localStorage.removeItem("jwt")
                                props.history.push("/sign_in")
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            <span style={{fontSize: '1.75em'}}><Icon size='large' fitted name='sign-out alternative' /> Sign Out</span>
                        </span>
                    </Grid.Column>
                </Grid.Row>

            <Grid.Row>
                {/* extract these as components */}
                <Grid.Column width={5}>

                    <Header as='h3' content='Goal Progress' />
                    <ProgressModule content={goalDisplay} hNum='h4' />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header as="h3" content="Lifetime Goal Progress" />
                    <ProgressModule content={lTGoalDisplay} hNum='h4' />
                </Grid.Column>                
            </Grid.Row>
        </Grid>

    )
}
