import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal, Segment } from 'semantic-ui-react'
import { UseGlobalState } from '../utils/stateContext'

  //* Set Data for Dropdown
  //* replace with db query for LTGoalsId.
  const dropdownOptions =[
    {key: 'career', text:'Career', value:'career'},
    {key: 'lifestyle', text:'Lifestyle', value:'lifestyle'},
    {key: 'artistic', text:'Artistic', value:'artistic'},
    {key: 'physical', text:'Physical', value:'physical'}
  ]


function FilterModal() {
  // set modal status
  const [open, setOpen] = useState(false)
  
  //Bring in state
  const {store, dispatch} = UseGlobalState();
  const { filter } = store
  
  // set initial form data
  const [formData, setFormData] = useState({})
  // destructure values from formData
  const {filteredLongTermGoals, showCompleted, showActive} = formData

  const [undoFilter, setUndoFilter] = useState(filter)
console.log(filter)

  // on page render:
  // - set formData to match filter
  useEffect(() => {
    
    // updateFilter(filter)
    setFormData(filter)

  }, [filter])
  
  // create function for updating filter
  function updateFilter(filterOptions){
    console.log(filterOptions.filteredLongTermGoals)
    dispatch({
      type: "setFilter",
      data: {
        filteredLongTermGoals: filterOptions.filteredLongTermGoals,
        showCompleted: filterOptions.showCompleted,
        showActive: filterOptions.showActive
      }
    })
  }
      
  function handleSelectBox(e){
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
      trigger={<Button content='Filter' attached='left' />}
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
        onClick={() => {
          setFormData(undoFilter);
          console.log('formData reset to:\n>', undoFilter )
          setOpen(false)
        }}
        negative
      />
        <Button
          floated='right'
          content="Filter"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
            setUndoFilter(formData);
            console.log('set undoFilter to:\n>', formData)
            updateFilter(formData);
            console.log('set filter state to:\n>', formData)
            setOpen(false)
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default FilterModal
