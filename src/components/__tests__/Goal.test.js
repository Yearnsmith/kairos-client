//import library
import { render, screen, cleanup } from "@testing-library/react";
const {debug} = screen;

//import Goal.js
import Goal from "../Goal";
// import Goals from "../Goals";
// create Goals data
const termGoal ={
    title: "My First Goal",
    description: '',
    timeframe: '',
    longTermGoal: '',
    category: '',
    events: [],
    createdOn: '',
    endDate: '',
    // color: 'orange'
};
// destructure for testing:
const { title, description, timeframe,
    LTermGoal, category, events,
    createdOn, endDate } = termGoal;

// render Goal component
beforeEach( () => render(<Goal termGoal={termGoal} />) );
// debug();
afterEach( () => cleanup() );

describe("Single Goal component", () => {
    it("should render cards that display term goal properties", () => {
        // Get h2 element
        const heading = screen.getByRole('heading', {name: title, level: 3});
        // h2 should be in the document
        expect(heading).toBeInTheDocument();

        //get info card
        const goalInfo = screen.getByTestId(/info-card/i);
        // goalInfo should be card
        expect(goalInfo).toHaveClass('card');

    });
});

