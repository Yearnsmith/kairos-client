import pluralize from 'pluralize'
import { StateContext } from './stateContext';

export default function reducer(state, action) {
    // a switch to test which action to update
    switch(action.type){
        // define action using case statements
        case "setTermGoals":
            // set the state with data recieved from action
            return {
                ...state, // spread current state
                termGoals: action.data
            };
        //makes filter persistent
        case "setFilter": {
            // destructure action.data
            const {filteredLongTermGoals, showCompleted, showActive} = action.data

            // if filter input was empty, add all goal categories.
            if(filteredLongTermGoals.length === 0){
                ['career', 'lifestyle', 'artistic', 'physical'].forEach(i =>{ filteredLongTermGoals.push(i)})
            } 

            // create goalsToShow array by mapping through all termGoals in state
            let goalsToShow = []
            state.termGoals.forEach( goal => {
                // include if goal's longTermGoal is included in action.data
                // if it isn't it won't be checked against completed and active tests.
                if( filteredLongTermGoals.includes(goal.longTermGoal) ){
                    // include if showCompleted is true, and goal has been completed
                    // if showCompleted is false it won't bother checking goal.completedAt
                    if(showCompleted && goal.completedAt){
                        goalsToShow.push( goal )
                    // include if goal hasn't been completed, and showActive is true
                    // if goal.completedAt is true, it won't bother checking against showActive
                    } else if(!goal.completedAt && showActive){
                        goalsToShow.push( goal )
                    }
                }
                // return null
            });

            return{
                ...state,
                filter: {
                    ...state.filter,
                    filteredLongTermGoals: filteredLongTermGoals,
                    showCompleted: showCompleted,
                    showActive: showActive,
                },
                filteredGoals: goalsToShow
            }
        }

        case "addGoal": {

            console.log(action.data)
            const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = action.data

            const timeframe = `${pluralize(timeframePeriod, Number(timeframeDigit), true)}`
            // const createdAt = Date.now()
            const newGoal = {
                title: title,
                description: description,
                longTermGoal: lifetimeGoal,
                timeframe: timeframe,
                events: [],
                id: Math.random().toString(36).substr(2, 9),
                color:'teal',
                createdAt: Date.now()
            }
            return{
                ...state,
                termGoals: [... state.termGoals, newGoal]
            }
        };

        default:
            return console.log('no such action')
    };
};