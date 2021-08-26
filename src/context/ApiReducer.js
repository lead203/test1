import {SHOW_LOADER, ADD_MSG, FETCH_MSG} from '../types'

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_MSG]: (state, {payload}) => ({
        ...state,
        cards: [...state.cards, payload]
    }),
    [FETCH_MSG]: (state, {payload}) => ({
        ...state, cards: payload, loading: false
    }),
    DEFAULT: state => ({...state, loading: false}),
}

export const ApiReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}