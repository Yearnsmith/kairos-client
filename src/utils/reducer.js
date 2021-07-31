export default function reducer(state, action) {
    // a switch to test which action to update
    switch(action.type){
        // define action using case statements
        case "setTermGoals": {
            // set the state with data recieved from action
            return {
                ...state, // spread current state
                termGoals: action.data
            };
        };

    };
};