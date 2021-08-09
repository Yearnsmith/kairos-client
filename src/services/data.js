
export const data = {
    lTGoals: [
        {
            id: '610f7cd0b5bf3de27fa9b34d',
            type: 'artistic',
            description: 'Perform in an RSC, or National Theatre prodction',
            goals: ['610f7de1e47c4661dfa4d801', ],
            createdAt: 1628405333514,
            editedAt: 1628405333514
        },
        {
            id: '610f7ed0a0255e9f21895298',
            type: 'education',
            description: 'Be academically acknowledged for work in theatre theory',
            goals:['610f7de1e47c4661dfa4d801'],
            createdAt: 1628407488698,
            editedAt: 1628407488698
        },
        {
            id: '610f7d8e652714427d9b6a7c',
            type: 'lifestyle',
            description: 'Become a world renown lifestyle guru',
            goals: ['610f7e1c6f456223fbc4135c'],
            createdAt: 1628407516181,
            editedAt: 1628407516181
        },
        {
            id: '610f7e1c6f456223fbc4135c',
            type: 'career',
            description: 'Run the next facebook',
            goals:['610f7e03ecfcf9e858c37608'],
            createdAt: 1628407531877,
            editedAt: 1628407531877
        },
        { 
            id: '610f8703d7cd0dc346739d70',
            type: 'physical',
            description: "Be 1980's Arnold Schwarznegger",
            goals: ['610f87483bc8c107e3921428'],
            createdAt: 1628407543743,
            editedAt: 1628407543743
        }

    ],
    termGoals: [
        {
            id: '610f7e1c6f456223fbc4135c',
            title:"My first goal",
            description: 'My very first goal',
            lTGoalsId: [
                {id:'610f7d8e652714427d9b6a7c', type: 'lifestyle'}
            ],
            timeframe: '1 week',
            events: [
            {id: '610f895dcae0858e8f67900f', title: 'Do a thing', completedAt: 1633092170000},
            {id: '610f8965a46ccbc793a54ac8', title: 'Make another thing happen', completedAt: 16338256530000},
            {id: '610f896c71e8b977fa0817b1', title: '...', completedAt: 1634375356000},
            {id: '610f8976457745f1a852abb2', title: 'Profit', completedAt: 1634896926000}
            ],
            createdAt:   1628254855000,
            editedAt:    1634896926000,
            completedAt: 1634896926000,
            color: 'teal'},
        {
            id: '610f7e03ecfcf9e858c37608',
            title: "Get a junior dev job",
            description: 'get a foot in the door as a junior developer.',
            lTGoalsId: [
                {id: '610f7e1c6f456223fbc4135c', type: 'career'}
            ],
            timeframe: '2 months',
            events: [
                {id: '610f898676b36de9ba4f101c', title: 'write resume'},
                {id: '610f899157f26a2e2c313b90', title: 'apply for 15 jobs'},
                {id: '610f899a868a5a979af831dc', title: 'make website'}
            ],
            createdAt:   134651972,
            editedAt:    1349832972,
            completedAt: null,
        },
        {
            id: "610f87483bc8c107e3921428",
            title: "Get a Pushups Routine",
            description: 'Pushups every day for 21 days',
            lTGoalsId: [
                {id: '610f8703d7cd0dc346739d70', type: 'physical'}
            ],
            timeframe: '21 days',
            events: [
                {id:'610f87ce6facb73efb0d305f', title: 'pushup sesh'}
            ],
            createdAt:   675231972,
            editedAt:    675238252,
            color: 'red'},
        {
            id: '610f7de1e47c4661dfa4d801',
            title: "Read 3 Seminal texts on Theatre",
            description: 'read the following books:\n- The Empty Space\n- The Theatre and it\'s double\n- Culture is the body',
            lTGoalsId: [
                {id: '610f7ed0a0255e9f21895298', type: 'education'},
                {id: '610f7cd0b5bf3de27fa9b34d', type:'artistic' }
            ],
            timeframe: '6 months',
            events: [
                {id: '610f89a762439a3cb4c0edc5', title: 'read 1 chapter of \'The Empty Space\''},
                {id: '610f89ae2073a0dde673fed2', title: 'read 1 chapter of \'The Theatre and it\'s double\''},
                {id: '610f89b5345160a2840cf130',title: 'read 1 chapter of \'Culture is the body\''}
            ],
            createdAt:   982739972,
            editedAt:    9830923902,
            color: 'blue'}
    ]
  }