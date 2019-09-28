import React, { Fragment, useContext } from 'react'
import { MapContext } from '../MapContext/MapContext'
import { Add, Edit, Del, Update } from '../Button/Button'
import Input from '../Input'
import EditUserForm from '../EditUserForm/EditUserForm'

function ListPanel() {
    const context = useContext(MapContext)
    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    {context.editing ? 
                        <EditUserForm /> 
                    :
                        <div className='input-group ml-3'>
                                <Input />
                            <div className='input-group-prepend ml-1'>
                                <Add />
                            </div>
                        </div>
                    }
                </div>
                    
                <div className='row mt-2'>
                    {context.loading ?
                            'loading...'
                            :
                            context.result.map((city, index) => (
                                <div className='col-sm-6' key={index}>
                                    <div className='card-columns d-flex justify-content-center'>
                                        <div className='card p-2'>
                                            <div className='card-block'>
                                                        <h4 className="card-title">{city.name}</h4>         
                                                        <Edit name={city.name} id={city.id}/>
                                                        <Del id={city.id} />      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ListPanel
