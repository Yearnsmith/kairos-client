import React from 'react'

export default function Goal({termGoals}) {
    
    return (
        <main data-testid="goalsView">
            <h2>Goals</h2>
            <div id="divPane">
                {termGoals.map( goal =>
                    <div key={goal.title}>
                        <h3>{goal.title}</h3>
                    </div>)}
            </div>
        </main>
    )
}
