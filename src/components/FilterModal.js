import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal, Segment } from 'semantic-ui-react'

function FilterModal() {
  const [open, setOpen] = React.useState(false)
  
  const [formData, setFormData] = useState({
    filteredLongTermGoals: [],
    showCompleted: false,
    showActive: true
  })
  const {filteredLongTermGoals, showCompleted, showActive} = formData
console.log(formData)
  // replace with db query for LTGoals id.
  const dropdownOptions =[
    {key: 'career', text:'Career', value:'career'},
    {key: 'lifestyle', text:'Lifestyle', value:'lifestyle'},
    {key: 'artistic', text:'Artistic', value:'artistic'},
    {key: 'physical', text:'Physical', value:'physical'}
  ]
    
  function handleSelectBox(e){
    console.log('target value:',e.target.value)
    if(e.target.className === 'delete icon'){
      setFormData({
        ...formData,
        filteredLongTermGoals: filteredLongTermGoals.filter( item => {
          return item !== e.target.parentNode.innerText.toLowerCase()
        })
      });
    }else(
      setFormData({
        ...formData,
        filteredLongTermGoals: [...filteredLongTermGoals,(e.target.textContent.toLowerCase())]
      })
    );
  }
    function handleCheckBoxes(e){
      console.log(e.target.checked)
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked
      })
    }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button content='Filter' size='huge' compact primary />}
      dimmer='inverted'
      data-testid='modalComponent'
    >
      <Modal.Header as='h3'>Filter Goals</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <label htmlFor='byLongtermGoal'>Show only:</label>
            <Dropdown
              placeholder='Choose a Long Term Goal'
              fluid
              multiple
              selection
              options={dropdownOptions}
              value={filteredLongTermGoals}
              id='filteredLongTermGoals'
              onChange={handleSelectBox}
              name='selectLongTermGoals'
            />
            <Form.Checkbox toggle checked={showCompleted} id="showCompleted" name='showCompleted' label='Show Completed' onChange={handleCheckBoxes} />
            <Form.Checkbox toggle checked={showActive} id="showActive" name='showActive' label='Show Active' onChange={handleCheckBoxes} />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions as={Segment} clearing attached='bottom'>
        <Button 
        floated='left'
        content='cancel'
        labelPosition='right'
        icon='delete'
        onClick={() => setOpen(false)}
        negative
      />
        <Button
          floated='right'
          content="Filter"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default FilterModal
