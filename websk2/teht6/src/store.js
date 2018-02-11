/*
import { applyMiddleware, createStore } from "redux";

import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

function userReducer(state = {
    user: {
        name: null,
        email: null,
        food: null,
        sauna: null
        },
    error: null
}, action) {
    switch (action.type) {
        case "SET_NAME": {
            return {
                ...state,
                user: { ...state.user, name: action.payload }
            }
        }
        case "SET_EMAIL": {
            return {
                ...state,
                user: { ...state.user, email: action.payload }
            }
        }
        case "SET_FOOD": {
            return {
                ...state,
                user: { ...state.user, food: action.payload }
            }
        }
        case "SET_SAUNA": {
            return {
                ...state,
                user: { ...state.user, sauna: action.payload }
            }
        }
    }
}

const middleware = applyMiddleware(promise(), thunk, createLogger());

export function setName(name) {
    return {
        type: "SET_NAME",
        payload: name
    }
}

export default createStore(userReducer, middleware);
*/