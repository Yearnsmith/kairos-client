
export default function reducer(state, action) {
    // a switch to test which action to update
    switch(action.type){
        // define action using case statements
        case "setLTGoals":
            // set the state with data recieved from action
            return{
                ...state,  // spread current state
                lTGoals: action.data
            };
        case "setHasBeenSaved":
            // set the state with data recieved from action
            return{
                ...state,  // spread current state
                globalBeenSaved: action.data
            };
        case "setTermGoals":
            return {
                ...state,
                termGoals: action.data
            };
        case "removeGoal":
            const newTermGoals = state.termGoals.filter(g => g.id !== action.data)
            return {
                ...state,
                termGoals: newTermGoals
            }
            

        //makes filter persistent
        case "setFilter": {
            // destructure action.data
            const {filteredLongTermGoals, showCompleted, showActive} = action.data

            // if filter input was empty, add all goal categories.
            if(filteredLongTermGoals.length === 0){
                state.lTGoals.forEach( i => filteredLongTermGoals.push(i.type))
                // ['career', 'lifestyle', 'artistic', 'physical'].forEach(i =>{ filteredLongTermGoals.push(i)})
            } 

            // create goalsToShow array by mapping through all termGoals in state
            let goalsToShow = []
            state.termGoals.forEach( goal => {
                
                // include if termGoal's lifetimeGoal is included in action.data
                // if it isn't it won't be checked against completed and active tests.
                goal.lTGoalsId.forEach(g => {

                    if(filteredLongTermGoals.includes(g.type)){
                        
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
                })
            });
            goalsToShow = Array.from(new Set(goalsToShow))
            
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

        case "setDate": {
            return {
                ...state,
                selectedDate: action.data
            }
        }

        case "storeEvents": {
            return {
                ...state,
                storedEvent: action.data
            }
        }
        
        case "addGoal": {
            return{
                ...state,
                termGoals: [...state.termGoals, action.data]
            }
        }

        case "setLoggedInUser": {
            return{
                ...state,
                loggedInUser: action.data
            }
        }

        default:
            return console.log('no such action')
    };
};