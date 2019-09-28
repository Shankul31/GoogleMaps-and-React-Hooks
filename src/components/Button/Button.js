import React, { useContext } from 'react'
import { MapContext } from '../MapContext/MapContext'

export const Add = () => {
    const context = useContext(MapContext)
    return (
        <button className='btn btn-info' onClick={(evt) => context.addCity(evt)}> Add </button>
    )
}
export const Edit = (props) => {
    const context = useContext(MapContext)
    return (
        <button className='btn btn-light mr-2' onClick={(evt) => context.editRow(props.name, props.id)}> Edit </button>
    )
}

export const Del = (props) => {
    const context = useContext(MapContext)
    return (
        <button className='btn btn-light' onClick={() => context.deleteCity(props.id)}> Delete </button>
    )
}
export const Update = (props) => {
    const context = useContext(MapContext)
    return (
        <button className='btn btn-light' onClick={() => context.UpdateCity(props.id, props.name)}>Update</button>
    )
}
export const Cancel = () => {
    const context = useContext(MapContext)
    return (
        <button className='btn btn-light' onClick={() => context.handleCancel()}>Cancel</button>
    )
}

export default { Add, Edit, Del }