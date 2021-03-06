import { LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from '../type';

const initialState = {
    authenticated: false,
    credentials: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        
        default:
            return state;
    }
}