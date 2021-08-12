import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon, Sidebar } from 'semantic-ui-react'
import NewEventModal from './NewEventModal'
import NewGoalModal from './NewGoalModal'


const mobileItems = [
    {key: 'goals', item: 'goals', icon: 'check circle'},
    {key: 'monthly', item: 'monthly_events', icon: 'calendar outline alternate'},
    {key: 'add', item: 'add', goal:{icon: 'check circle'}, event:{icon: 'calendar outline alternate'}},
    {key: 'profile', item: 'profile', icon: 'user'},
    {key: 'settings', item: 'settings', icon: 'sliders'}
]

export default function Nav() {
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

    // Hide on scroll. Set some states
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    function handleScroll(){
        // get current position
        const currentScrollPos = window.pageYOffset;
        // if this evaluates to true, navbar is vislible
        setVisible(
            //evalutes to true if current scroll position is not greater than previous, or we're scrolling WAY up
            // But if we've scrolled less than 10px, it's still visible.
            ( (prevScrollPos > currentScrollPos && (prevScrollPos - currentScrollPos) > 70) || (currentScrollPos < 10) )
            );

            //set state to new position
            setPrevScrollPos(currentScrollPos);
    };
    
    //add event listener to listen for scrolling
    useEffect(()=>{
        
        window.addEventListener('scroll', handleScroll);

    },[prevScrollPos, handleScroll]);

    console.log(visible, prevScrollPos)
    console.log()
    return (
        <Sidebar
        as={Menu}
        role='navigation'
        direction='bottom'
        animation='overlay'
        width='very thin'
        widths={5}
        visible={visible}
        borderless
        size='tiny'
        icon
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

        </Sidebar>
    )
}