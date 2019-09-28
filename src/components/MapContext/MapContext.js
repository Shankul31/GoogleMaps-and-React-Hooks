import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useMergeState } from '../Utils/Utils'

export const MapContext = createContext()

export const MapProvider = props => {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [userInput, setUserInput] = useState('')
    const [editing, setEditing] = useState(false)
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [updatedCity, setUpdatedCity] = useMergeState({
        id: '',
        name: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:3000/markers`).then(res => {
            setResult(res.data)
            setLoading(false)
        })
    }, [])


    const handleInputChange = value => {
        setUserInput(value)
    }

    const getLatLong = city => {
        axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyBxVRFDwnnIHoMn37qj9uSZtnj4tIo6luE',
        ).then(res => {
            if (res.status === 200) {
                setLat(res.data.results[0].geometry.location.lat)
                setLng(res.data.results[0].geometry.location.lng)
            }
        })
    }

    const getMarkers = () => {
        axios.get(`http://localhost:3000/markers`).then(res => {
            setResult(res.data)
            setLoading(false)
            setUserInput('')
        })
    }

    const addCity = (evt) => {
        axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput + '&key=AIzaSyBxVRFDwnnIHoMn37qj9uSZtnj4tIo6luE',
        ).then(res => {
            if (res.data.status === 'OK') {
                let URL = `http://localhost:3000/markers`
                axios.post(URL, {
                    name: userInput,
                    latitude: res.data.results[0].geometry.location.lat,
                    longitude: res.data.results[0].geometry.location.lng
                })
                    .then(response => {
                        if (response.status === 201)
                           getMarkers()
                    })
            }
            else { console.log('not found!!') }
        })
    }
    const UpdateCity = () => {
        setEditing(false)
        setUpdatedCity({ name: userInput })
        getLatLong(userInput)
    }

    const updateMarkers = () => {
        if (!updatedCity.id) return
        axios.put('http://localhost:3000/markers/' + updatedCity.id, {
            name: userInput,
            latitude: lat,
            longitude: lng
        })
            .then(res => {
                console.log('resedit', res)
                if (res.status === 204) {
                    getMarkers()
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    //Update Markers
    useEffect(() => {
        console.log('updatedstate', lat, lng)
        updateMarkers()
    }, [lat, lng])

    const editRow = (city, id) => {
        setEditing(true)
        setUserInput(city)
        setUpdatedCity({ id: id })
    }

    const deleteCity = id => {
        // DELETE /markers/:id
        axios.delete('http://localhost:3000/markers/' + id).then(res => {
            // setResult(res.data)
            if (res.status === 204) {
                axios.get('http://localhost:3000/markers').then(res => {
                    setResult(res.data)
                    setLoading(false)
                })
            }
        })
    }

    const handleCancel = () => {
        setEditing(false)
        setUserInput('')
    }

    return (
        <MapContext.Provider value={{
            result: result,
            loading: loading,
            handleInputChange,
            addCity,
            editRow,
            deleteCity,
            userInput,
            editing,
            UpdateCity,
            handleCancel
        }}>
            {props.children}
        </MapContext.Provider>
    )
}
