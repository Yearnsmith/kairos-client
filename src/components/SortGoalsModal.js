import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal, Radio, Segment } from 'semantic-ui-react'
import { UseGlobalState } from '../utils/stateContext'

  //* Set Data for Dropdown
  //* replace with db query for LTGoalsId.
  const dropdownOptions =[
    {key: 'career', text:'Career', value:'career'},
    {key: 'lifestyle', text:'Lifestyle', value:'lifestyle'},
    {key: 'artistic', text:'Artistic', value:'artistic'},
    {key: 'physical', text:'Physical', value:'physical'}
  ]


function FilterModal({sortState, handleSort}) {
  // set modal status
  const [open, setOpen] = useState(false)
    
  // set initial form data
  const [formData, setFormData] = useState('dateCreated')
    console.log('this is the formDataState', formData)
  // Set undo value from Goals
  const [undoSort, setUndoSort] = useState(sortState)
  console.log('this is the undoSort state:', undoSort)
  
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
            {/* <label>Sort By:</label> */}
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
                label='Lifetime Goal'
                name='sortBy'
                value='LTG'
                checked={formData === 'LTG'}
                onChange={handleChange}
                slider
              />
              <Radio
                label='Lifetime Goal Type'
                name='sortBy'
                value='LTGCategory'
                checked={formData === 'LTGCategory'}
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
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions as={Segment} clearing attached='bottom'>
        {/* <Button 
        floated='left'
        content='cancel'
        labelPosition='right'
        icon='delete'
        onClick={() => {
          setFormData(undoSort);
          console.log('formData reset to:\n>', undoSort )
          setOpen(false)
        }}
        negative
      /> */}
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
          // positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default FilterModal
