import React, {useContext} from "react";
import { renderWithRouter, render, screen } from './test-utils/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { StateContext, UseGlobalState } from '../../utils/stateContext'
import userEvent from "@testing-library/user-event"
import { fireEvent } from "@testing-library/dom";

import App from "../App"
import SignUpForm from "../LtGoalsForm";

const customRender = (ui, {providerProps, ...renderOptions}) => {
    return render(
        <StateContext.Provider {...providerProps}>{ui}</StateContext.Provider>,
        renderOptions,
    )
}

test('NameCOnsumer shows value from provider', () => {
    const providerProps = {
        store: ,
        dispatch
    }
})


describe('Lifetime Goals Form Unit Tests', ()=>{
    
    // load form component
    beforeEach( () => renderWithRouter(<App />) )

    //define data
    const lifetimeGoalList = ['career','artistic','intellectual','physical','lifestyle'];
    
    
    // 5 textareas should appear
    it('should display 5 Textarea components with headings corresponding to goalsList',()=>{

        const lifetimeGoalHeadings = []
        const lifetimeGoalTextboxes = [] 

        lifetimeGoalList.forEach( ltg => {
            lifetimeGoalHeadings.push( screen.getByRole('heading', {  name: ltg }) )
        })
        lifetimeGoalList.forEach( ltg => {
            lifetimeGoalTextboxes.push( screen.getByRole('texbox', {  name: ltg }) )
        })

        lifetimeGoalHeadings.forEach( heading => {
            expect(heading).toBeInTheDocument();
        })

        lifetimeGoalTextboxes.forEach( heading => {
            expect(heading).toBeInTheDocument();
        })


    })

})

// done button should appear

// text areas should accept text

// button should appear when field is selected

