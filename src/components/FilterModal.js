import React, { useState } from 'react'
import { Button, Container, Dropdown, Form, Input, Modal, Segment } from 'semantic-ui-react'

function FilterModal() {
  const [open, setOpen] = React.useState(false)

  const [formData, setFormData] = useState({
    filteredLongTermGoals: [],
    showCompleted: false,
    showIncomplete: true
  })
  const {filteredLongTermGoals, showCompleted, showIncomplete} = formData
console.log(formData)
  // replace with db query for LTGoals id.
  const dropdownOptions =[
    {key: 'career', text:'career', value:'career', name:'filteredLongTermGoals' },
    {key: 'lifestyle', text:'Lifestyle', value:'lifestyle'},
    {key: 'artistic', text:'Artistic', value:'artistic'}
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
            />
          {/* <Dropdown fluid multiple search text="select goals" value={filteredLongTermGoals}>
            <Dropdown.Menu>
              <Dropdown.Header content='select lifetime goals to view'/>
              <Dropdown.SearchInput />
              {dropdownOptions.map( o => 
                <Dropdown.Item text={o.text} name='filteredLongTermGoals' key={o.text}/>
              )}
            </Dropdown.Menu>
          </Dropdown> */}
            <Form.Checkbox toggle checked={showCompleted} id="showCompleted" name='showCompleted' label='Show Completed' onChange={handleCheckBoxes} />
            <Form.Checkbox toggle checked={showIncomplete} id="showIncomplete" name='showIncomplete' label='Show Incomplete' onChange={handleCheckBoxes} />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions as={Segment} clearing attached='bottom'>
        <Button 
        content='cancel'
        labelPosition='right'
        icon='delete'
        color='red'
        onClick={() => setOpen(false)}
        floated='left'
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
