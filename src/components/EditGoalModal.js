import React, { useState } from 'react'
import { Modal, Button} from 'semantic-ui-react'
import GoalForm from './GoalForm'

export default function NewGoalModal({goalTitle, setGoalUpdated}) {
    // set modal status
    const [open, setOpen] = useState(false)
    
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
