import React, { useState } from 'react'
import { Modal, Button} from 'semantic-ui-react'
import GoalForm from './GoalForm'

export default function NewGoalModal({goal, setGoalUpdated}) {
    // set modal status
    const [open, setOpen] = useState(false)
    
    //render modal
    return (
        <Modal
            closeIcon
            onClose={() => {
                setOpen(false)
            }}
            onOpen={() => setOpen(true) }
            open={open}
            data-testid='editGoalModal'
            trigger={
                // this renders on the page to toggle the modal on and off
                <Button content='Edit' icon='pencil' />
            }
        >
            <Modal.Header>{`Edit "${goal.title}"`}</Modal.Header>
            <Modal.Content>
                {/* TODO: refactor some of these as reducer methods. */}
                <GoalForm setOpen={setOpen} goal={goal} setGoalUpdated={setGoalUpdated} />
            </Modal.Content>
        </Modal>
    )
}
