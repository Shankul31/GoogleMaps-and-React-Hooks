import React, { useContext } from 'react'
import { MapContext } from '../MapContext/MapContext'
 
const Input = () => {
    const context = useContext(MapContext)
    return (
        <div>
            <input className='form-control' type="text" value={context.userInput} onChange={evt=>context.handleInputChange(evt.target.value)}/>
        </div>
    )
}

export default Input

