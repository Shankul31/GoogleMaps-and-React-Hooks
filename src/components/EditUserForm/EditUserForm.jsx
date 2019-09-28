import React from 'react'
import Input from '../Input'
import {Update, Cancel} from '../Button/Button'

function EditUserForm() {
    
    return (
        <div className='input-group ml-3'>
                <Input />
            <div className='input-group-prepend ml-1'>
                <Update />
            </div>
            <div className='input-group-prepend ml-1'>
                <Cancel />
            </div>
        </div>
    )
}

export default EditUserForm
