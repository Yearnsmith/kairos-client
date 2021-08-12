import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import NewEventModal from './NewEventModal'
import NewGoalModal from './NewGoalModal'


const mobileItems = [
    {key: 'goals', item: 'goals', icon: 'check circle'},
    {key: 'monthly', item: 'monthly_events', icon: 'calendar outline alternate'},
    {key: 'add', item: 'add', goal:{icon: 'check circle'}, event:{icon: 'calendar outline alternate'}},
    {key: 'profile', item: 'profile', icon: 'user'},
    {key: 'settings', item: 'settings', icon: 'sliders'}
]

export default function Nav({navBarRef}) {
    // stores which tab is active
    const [activeTab, setActiveTab] = useState('');

    // get current page
    const {pathname} = useLocation()

    // get location without precedin "/". This corresponds with menu item names
    const currentScreen = pathname.substring(1)
    
    useEffect(()=>{
        // listen to pathname, and set the active tab based on URL.        

        setActiveTab(currentScreen)

    },[pathname])

    // toggle colour of tab based on which tab is active.
    const handleColor = (item) => activeTab !== item ? 'grey' : 'blue'


    return (
        <Menu
        icon
        borderless
        widths={5}
        fixed='bottom'
        size='mini'
        ref={navBarRef}
        >
        {mobileItems.map( i =>
                <Menu.Item
                    as={i.item === 'add' ? null : Link}
                    to={i.item === 'add' ? null : `/${i.item}`}
                    name={i.item}
                    active={i.item !== 'add' ? (activeTab === i.item) : false}
                    // force items to have white background, and cursor to be pointer
                    // We can remove these if I get time to modify SemanticUI CSS
                    style={{backgroundColor: 'white', cursor: 'pointer'}}
                    key={i.key}
                >
                    { i.item !== 'add' ?
                        <Icon size='big' color={handleColor(i.item)} name={i.icon} />
                    :
                        // conditionally add newEvent or newGoal modal. In this configuration it defaults
                        // to creating a new goal, unless the user is on the events page.
                        pathname === '/monthly_events' || pathname === '/weekly_events' ?
                            // new goal event modal
                            <NewEventModal />
                        :   // new goal modal
                            <NewGoalModal />
                    }
            {/* </Link> */}
                </Menu.Item>

        )}

        </Menu>
    )
}