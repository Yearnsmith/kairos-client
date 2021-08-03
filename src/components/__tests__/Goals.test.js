//import libraries
import { render, screen, cleanup, renderWithRouter, within } from "./test-utils/test-utils";
import { data } from "../../services/data";
const {debug} = screen;

// import Goals component
import Goals from '../Goals';
import App from '../App';
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const termGoals = data.termGoals

// https://medium.com/swlh/6-ways-to-run-jest-test-cases-silently-67d2fead8c11#41a9
beforeAll(()=>{
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

describe("Goals component has all sub-components", () => {
    // render Goals component
    beforeEach( () => renderWithRouter(<App />, '/goals') );
    afterEach( () => cleanup() );
    
    it("should render h2 element that has 'Goals' as text", () => {
        // Set h2 element
        const heading = screen.getByRole('heading', {name: /goals/i, level: 2});
        // h2 should be in the document
        expect(heading).toBeInTheDocument();
    });
    
    it("should render all user's *Active* Term Goals as Semantic UI Segments with Goal data as h3 headers", () => {
        
        // first test inspired by https://kentcdodds.com/blog/write-fewer-longer-tests
        
        // Goal instances should load //
        /*---------------------------*/

        // create array of title properties
        const activeTermGoals = termGoals.filter( goal => {
            if(!goal.completedAt){
                if(goal.longTermGoal !== 'intellectual/education'){
                    return goal.title
                }
            } 
        })
        // const activeTermGoals = termGoals
        console.debug(termGoals[0].title)
        const activeTermGoalsText = activeTermGoals.map(goal => goal.title);

        const termGoalsColor = activeTermGoals.map( goal => goal.color);
        
        // get all goal list items
        const goalEls = screen.getAllByRole('listitem')
        const goalElsListItems = goalEls.map(el => el.firstChild)

        // get all title elements and create array of textContent.
        const goalElsText = goalEls.map(el => el.textContent)
        // get the className and separate out color
        const goalElsColor = goalElsListItems.map(el => el.className.split(' ')[3])
        
        // should match text 
        expect(goalElsText).toEqual(activeTermGoalsText);
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

 //* Goals Filter *//
//*==============*//

const longTermGoals = [ 'career', 'physical', 'artistic', 'lifestyle' ]
// relearn how to get the element to render this dummy data instead of
// real data loading in the page
const testGoals = [
    {title: 'completed goal', longTermGoal: 'lifestyle', completedAt: 1238372},
]

describe('Goals filter', ()=>{
    // Loading App, because reducer functions and helper functions are declared here.
    // this should change when StateContext is integrated.
    beforeEach( () => renderWithRouter(<App />) );
    afterEach( ()=> cleanup() );

    it('should show a Filter <Button /> and load a Modal component with 3 filtering options when it is clicked.', ()=>{
        
        //* Filter Button should be in goals view
        //get filter modal button
        const filterModalButton = screen.getByRole('button', {name: /filter/i})
        expect(filterModalButton).toBeInTheDocument();

        //* when clicked, the modal should appear
        //click filterModalButton
        userEvent.click(filterModalButton);

        //get modal component
        const modalComponent = screen.getByTestId('modalComponent');
        // const modalComponent = screen.
        expect(modalComponent).toBeInTheDocument();

        //* Select box should be in the document and be a dropdown with mulitple selection options
        const LTGListbox = screen.getByRole('listbox')
        expect(LTGListbox).toHaveClass('multiple','selection', 'dropdown' )
        
        //* All Long Term Goals should be tagged in initial load

        // get all labels in combo box
        const LTGLabels = within(LTGListbox)
            .getAllByText(/career|lifestyle|physical|artistic/i)
            .map(el => el.textContent)

        LTGLabels.forEach( labelText =>{
            let valueCheck = longTermGoals.includes(labelText.toLowerCase());
            // console.debug(`${labelText}: ${valueCheck}`)
            expect(valueCheck).toBe(true);
            
        });
        //* The default state of "show completed" should be toggled **off**
        
        // "show completed" option should have a checkbox...
        const showCompletedCheckbox = within(modalComponent).getByRole('checkbox', {name: /show completed/i})
        expect(showCompletedCheckbox).toBeInTheDocument();
        // ...and have class `toggle`
        const showCompletedToggle = showCompletedCheckbox.parentElement
        expect(showCompletedToggle).toHaveClass('toggle')

        // "show completed" toggle shoud have value 'false'
        const showCompletedLabel = showCompletedToggle.lastChild
        expect(showCompletedToggle).not.toHaveClass('checked')
        // console.debug(showCompletedToggle.outerHTML)
        
        //* The default state of "show Active" should be toggled **on**
        userEvent.click(showCompletedLabel)
        expect(showCompletedToggle).toHaveClass('checked')
        // console.debug(showCompletedToggle.outerHTML)
    });

    it('should only show goals that correspond to filtering options',()=>{
        //* goals should appear if they are in a filtered Long Term Goal
        // console.debug(LTGLabels)
        
        //* goals should **not** appear if they are **not** in a filtered Long Term Goal
        
    
        //* Goals with `CompletedAt` property should **not** appear when "show completed" is toggled **off**
        
    
        //* Goals with `CompletedAt` property **should** appear when "show completed" is togged **on**
        
        // select all visible goals
    
        // visible goals should have a value of
    
    
        //* Goals **not** with `CompletedAt` property should appear when "show active" is toggled **on**
    
        //* Goals with `CompletedAt` property should **not** appear when "show active" is toggled **off**

    })


});