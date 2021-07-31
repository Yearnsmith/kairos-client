//import libraries
import { render, screen, cleanup } from "@testing-library/react";
import { data } from "../../services/data";
const {debug} = screen;

// import Goals component
import Goals from '../Goals';

// create Goals data
// const termGoals = [
//     {title: "First Goal", color: 'orange'},
//     {title: "Second Goal", color: 'violet'},
//     {title:"Third Goal", color: 'yellow'},
//     {title: "Fourth Goal", color: 'teal'}
// ];
const termGoals = data.termGoals

// render Goals component
beforeEach( () => render(<Goals termGoals={termGoals} />) );
afterEach( () => cleanup() );

describe("Goals component has all sub-components", () => {
    
    it("should render h2 element that has 'Goals' as text", () => {
        // Set h2 element
        const heading = screen.getByRole('heading', {name: /goals/i, level: 2});
        // h2 should be in the document
        expect(heading).toBeInTheDocument();
        cleanup();
    });
    
    it("should render all user's Term Goals as Semantic UI Segments with Goal data as h3 headers", () => {
        
        // first test inspired by https://kentcdodds.com/blog/write-fewer-longer-tests
        
        // Goal instances should load //
        /*---------------------------*/

        // create array of title properties
        const termGoalsText = termGoals.map( goal => goal.title);
        const termGoalsColor = termGoals.map( goal => goal.color);
        
        // get all goal list items
        const goalEls = screen.getAllByRole('listitem')
        const goalElsListItems = goalEls.map(el => el.firstChild)

        // get all title elements and create array of textContent.
        const goalElsText = goalEls.map(el => el.textContent)
        // get the className and separate out color
        const goalElsColor = goalElsListItems.map(el => el.className.split(' ')[3])
        
        // should match text 
        expect(goalElsText).toEqual(termGoalsText);
        // should match color
        expect(goalElsColor).toEqual(termGoalsColor);
        // className should include 'segment'
        goalElsListItems.forEach( el => expect(el).toHaveClass('segment') )
        

    });

    it("should render Semantic UI Buttons for filtering and sorting'", () => {
        // for testing desktop view
        // const header = screen.getByRole('heading', {name: /goals/i, level: 2});
        // const goalsMenu = screen.getByRole('menu', {name: /goal-menu/i});
        
        // define items that should be in filtering menu:
        const goalsMenuItems = ['Filter','Sort','All'];
        // get all button elements and create array of text content
        const buttonElsText = screen.getAllByRole('button').map( el => el.textContent)
        // compare text content of buttons to goalsMenuItems array
        expect(buttonElsText).toEqual(goalsMenuItems);
    });
});