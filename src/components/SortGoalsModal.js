import React, { useState } from 'react'
import { Button, Form, Modal, Radio, Segment } from 'semantic-ui-react'

function FilterModal({sortMethod, handleSort}) {
  // set modal status
  const [open, setOpen] = useState(false)
    
  // set initial form data
  const [formData, setFormData] = useState(sortMethod)

  // Set undo value from Goals
  const [undoSort, setUndoSort] = useState(sortMethod)

    function handleChange(e, data){
      setFormData(data.value)
    }
  return (
    <Modal
      closeIcon
      onClose={() => {
        setFormData(undoSort)
        setOpen(false)
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button content='Sort' attached />}
      dimmer='inverted'
      data-testid='modalComponent'
    >
      <Modal.Header as='h3'>Sort Goals</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field style={{minHeight:'200px',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Radio
                label='Date Created'
                name='sortBy'
                value='dateCreated'
                checked={formData === 'dateCreated'}
                onChange={handleChange}
                slider
              />
              <Radio
                label='Date Due'
                name='sortBy'
                value='dateDue'
                checked={formData === 'dateDue'}
                onChange={handleChange}
                slider
              />
              <Radio
                label='Date Completed'
                name='sortBy'
                value='dateCompleted'
                checked={formData === 'dateCompleted'}
                onChange={handleChange}
                slider
              />
              <Radio
                label='Lifetime Goal'
                name='sortBy'
                value='LTG'
                checked={formData === 'LTG'}
                onChange={handleChange}
                slider
              />
              <Radio
                label='Title'
                name='sortBy'
                value='title'
                checked={formData === 'title'}
                onChange={handleChange}
                slider
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions as={Segment} clearing attached='bottom'>

        <Button
          floated='right'
          content="Sort"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
            setUndoSort(formData);
            console.log('set undoSort to:\n>', formData)
            handleSort(formData);
            console.log('set filter state to:\n>', formData)
            setOpen(false)
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default FilterModal
