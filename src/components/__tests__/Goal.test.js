//import library
import { render, screen, cleanup } from "@testing-library/react";
import { data } from "../../services/data";
const {debug} = screen;

//import Goal.js
import Goal from "../Goal";
// import Goals from "../Goals";
// create Goals data
// const termGoal ={
//     title: "My First Goal",
//     description: 'The first goal I ever did make.',
//     timeframe: '1 week',
//     longTermGoal: 'Lifestyle',
//     events: [
//         {title: 'My first event'},
//         {title: 'my second event'},
//         {title: 'another event'}
//     ],
//     comletedAt: '',
//     createdOn: '',
//     endDate: '',
//     // color: 'orange'
// };
const termGoal = data.termGoals[0]
// destructure for testing:
const { title, description, timeframe,
    longTermGoal, completedAt, events,
    createdOn, endDate } = termGoal;

// render Goal component
beforeEach( () => render(<Goal termGoal={termGoal} />) );
// debug();
// console.log(termGoal)
afterEach( () => cleanup() );

describe("Single Goal renders cards that display term goal properties", () => {
    // debug();
    it("should render heading", () => {
        // Get h2 element
        const heading = screen.getByRole('heading', {name: title, level: 2});
        // h2 should be in the document
        expect(heading).toBeInTheDocument();
    });
    it("should render goal info", ()=>{
        //get info card
        const goalInfo = screen.getByTestId('info-card');
        // goalInfo should be card
        expect(goalInfo).toHaveClass('card');

        //get description header (which is inside card)
        const descriptionHeader = screen.getByRole('heading', {name: /description/i, level: 3});
        // description header should be rendered
        expect(descriptionHeader).toBeInTheDocument();

        //get Card.Description component
        const goalDescription = screen.getByTestId('info-card-description').textContent;
        // description should be rendered
        expect(goalDescription).toEqual(description);

        //get LT Goal label
        const longTermGoalEl = screen.getByText(longTermGoal);

        // long term label reference should be a label
        expect(longTermGoalEl).toHaveClass('label');
        // Goal should display correct long term goal
        expect(longTermGoalEl.textContent).toMatch(/lifestyle/i);

        // get timeframe label
        const timeframeEl = screen.getByText(timeframe)
        //timeframe should be a label
        expect(timeframeEl).toHaveClass('label');
        // timeframe should display crrect timeframe
        expect(timeframeEl.textContent).toMatch(/1 week/i);
    });

    it('should display a list of events that link to event components', ()=>{
        debug();
        // card should exist
        const eventsCardEl = screen.getByTestId('events-card');
        expect(eventsCardEl).toBeInTheDocument();

        //card should display a list
        const eventListEl = screen.getByRole('list');
        expect(eventListEl).toBeInTheDocument();

        //event card should display all event items
        const eventListItemEls = screen.getAllByRole('listitem');
        // get the text of these list items and cast to an array
        const eventListItemElsText = eventListItemEls.map(el => el.textContent);
        // create an array from the events data at top of this file
        const eventsTitles = events.map( event => event.title);
        
        // elements rendered should match data.
        expect(eventListItemElsText).toEqual(eventsTitles)
    });
});

