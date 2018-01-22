const ORDERS_INITIAL_STATE = { list: [] };
import { ORDERS_FETCHED } from '../constants'

export default (state = ORDERS_INITIAL_STATE, action) => {
    switch(action.type) {
        case ORDERS_FETCHED:
            return { ...state, list: action.payload.data };
        default:
            return state;
    }
}