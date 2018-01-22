const PRODUCTS_INITIAL_STATE = { clients: [] };
import { PRODUCTS_FETCHED } from '../constants'

export default (state = PRODUCTS_INITIAL_STATE, action) => {
    switch(action.type) {
        case PRODUCTS_FETCHED:
            return { ...state, products: action.payload.data };
        default:
            return state;
    }
}