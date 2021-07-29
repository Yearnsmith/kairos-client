//import libraries
import { render, screen, RenderResult, cleanup } from "@testing-library/react";
const {debug} = screen;

// import Goals component
import Goals from '../Goals';

// create Goals data
const termGoals = [
    {title: "First Goal"},
    {title: "Second Goal"},
    {title:"Third Goal"},
    {title: "Fourth Goal"}
];

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
    
    it("should render all user's Term Goals with Goal info", () => {
        
        // first test inspired by https://kentcdodds.com/blog/write-fewer-longer-tests
        
        // Goal instances should load //
        /*---------------------------*/

        // create array of title properties
        const termGoalsText = termGoals.map( goal => goal.title);
        
        // get all title elements and create array of textContent.
        const goalElsText = screen.getAllByRole('heading', {level:3}).map(el => el.textContent);
        // match with 
        expect(goalElsText).toEqual(termGoalsText);

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