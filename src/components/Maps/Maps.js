import React, {Fragment, useContext} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { MapContext } from '../MapContext/MapContext'
 
const Maps = props => {
     const context = useContext(MapContext)
    return (
        <Fragment>
            <Map
                google={props.google}
                zoom={5}
                initialCenter={{ lat:50.204567 , lng: 9.186373 }}
                style={{
                    width: '100%', height: '400px'
                }}
            >
                {context.result.length>0 && context.result.map((city,index)=>(
                    <Marker 
                        key={index}
                        position={{
                            lat: city.latitude,
                            lng: city.longitude
                        }}
                    />
                ))}
            </Map>
        </Fragment>
    )
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
  })(Maps)