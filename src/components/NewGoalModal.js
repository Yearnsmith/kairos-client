import React, { useState } from 'react'
import { Modal, Icon } from 'semantic-ui-react'
import GoalForm from './GoalForm'

export default function NewGoalModal() {
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
            onOpen={() => setOpen(true)}
            open={open}

            data-testid='newGoalModal'
            
            trigger={
                <Icon.Group size='huge' onClick={toggleTriggerColor}>
                    <Icon color={triggerColor[0]} name='plus' />
                    <Icon color={triggerColor[1]} name={'check circle'} corner='top right' />
                </Icon.Group>}
        >
            <Modal.Header>Create New Goal</Modal.Header>
            <Modal.Content>
                <GoalForm setOpen={setOpen} toggleTriggerColor={toggleTriggerColor} />
            </Modal.Content>
        </Modal>
    )
}
