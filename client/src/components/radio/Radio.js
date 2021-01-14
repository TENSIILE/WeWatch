import React from 'react'
import classnames from 'classnames'

import './radio.scss'

export const Radio = ({ 
    text,
    id,
    state,
    stateElement, 
    setState, 
    newClass
}) => {
    return (  
        <div 
            className={classnames('radio', [newClass], {'active': stateElement})}
            onClick={e => Radio.selectRadio(e, state, setState)} 
            id={id}
        >
            <span>{text}</span>
        </div>
    )
}

Radio.selectRadio = (event, state, setState) => {
    let defaultValue = {}

    for (let k in state) {
        defaultValue[k] = state[k] = false
    }

    setState({
        ...defaultValue,
        [event.target.closest("div.radio").id]: true}
    ) 
}

Radio.Container = ({ children }) => <div className="container-radio mt-1">{ children }</div>