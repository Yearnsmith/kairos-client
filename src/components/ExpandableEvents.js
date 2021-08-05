import React, {useState} from 'react'
import {Container} from 'semantic-ui-react'
import {UseGlobalState} from '../utils/stateContext'

export default function ExpandableEvents () {

    const { store } = UseGlobalState()
    const { selectedDate } = store

    return (
        <div>
            {selectedDate}
        </div>
    )
}