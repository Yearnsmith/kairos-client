import React, { useEffect, useState } from 'react'
import { Form, Modal, Button, Grid, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { UseGlobalState } from '../utils/stateContext'
// import pluralize from 'pluralize'
import { createGoal } from '../services/goalServices'
import { compileNewGoal } from '../utils/goalUtils'
import { getLTGoalById, getLTGoals } from '../services/lifetimeGoalServices'
import { getGoalById } from '../services/goalServices'
import GoalForm from './GoalForm'

export default function NewGoalModal({goalTitle, setGoalUpdated}) {
    // set modal status
    const [open, setOpen] = useState(false)

    const {store, dispatch} = UseGlobalState();
    
    const [triggerColor, setTriggerColor] = useState(['grey', 'grey'])

    const toggleTriggerColor = ()=>{
        setTriggerColor(
            triggerColor.includes('grey') ? ['blue', 'green'] : ['grey', 'grey']
            )
    }

    //render modal
    return (
        <Modal
            closeIcon
            onClose={() => {
                toggleTriggerColor()
                setOpen(false)
            }}
            onOpen={() => setOpen(true) }
            open={open}
            data-testid='editGoalModal'
            trigger={
                <Button content='Edit' icon='pencil' />
            }
        >
            <Modal.Header>{`Edit "${goalTitle}"`}</Modal.Header>
            <Modal.Content>
                <GoalForm setOpen={setOpen} toggleTriggerColor={toggleTriggerColor} setGoalUpdated={setGoalUpdated} />
            </Modal.Content>
        </Modal>
    )
}
