import React, {useReducer} from 'react'
import {ApiReducer} from './ApiReducer'
import {ADD_MSG, FETCH_MSG, SHOW_LOADER} from '../types'

const url = process.env.REACT_APP_API_URL

export const ApiState = () => {
    const initialState = {
        date: [],
        loader: false
    }

    const [state, dispath] = useReducer(FirebaseReducer, initialState)

    const showLoader = () => dispath({type: SHOW_LOADER})
}