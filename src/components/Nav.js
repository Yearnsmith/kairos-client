import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import NewGoalModal from './NewGoalModal'


const mobileItems = [
    {key: 'goals', item: 'goals', icon: 'check circle'},
    {key: 'calendar', item: 'calendar', icon: 'calendar outline alternate'},
    {key: 'add', item: 'add', goal:{icon: 'check circle'}, event:{icon: 'calendar outline alternate'}},
    {key: 'profile', item: 'profile', icon: 'user'},
    {key: 'settings', item: 'settings', icon: 'sliders'}
]

export default function Nav() {

    const [menuState, setMenuState] = useState( { activeItem: 'goals' })
    const {activeItem} = menuState
    
    const handleItemClick = (_,data) => setMenuState({activeItem: data.name})
    
    const handleColor = (item) => activeItem !== item ? 'grey' : 'blue'

    const {pathname} = useLocation()
    console.log(pathname)

    return (
        <Menu
        icon
        borderless
        widths={5}
        fixed='bottom'
        size='mini'
        >
        {mobileItems.map( i =>
                <Menu.Item
                    as={i.item === 'add' ? false : Link}
                    to={i.item === 'add' ? false : `/${i.item}`}
                    name={i.item}
                    active={i.item !== 'add' ? (activeItem === i.item) : false}
                    onClick={handleItemClick}
                    style={{backgroundColor: 'white'}}
                >
                {/* <Link class='item' name={i.item} active={activeItem === i.item} onClick={handleItemClick}> */}
                    { i.item !== 'add' ?
                        <Icon size='big' color={handleColor(i.item)} name={i.icon} />
                    :
                        // conditionally add newEvent or newGoal modal. In this configuration it defaults
                        // to creating a new goal, unless the user is on the events page.
                        pathname === '/calendar' ?
                            // new goal event modal
                            <Icon.Group size='huge'>
                                <Icon color={handleColor(i.item)} name='plus' />
                                <Icon color={handleColor(i.item)} name={i.event.icon} corner='top right' />
                            </Icon.Group>
                        :   // new goal modal
                            <NewGoalModal />
                    }
            {/* </Link> */}
                </Menu.Item>

        )}
  
          </Menu>
      )
  }