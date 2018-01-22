const CLIENTS_INITIAL_STATE = { clients: [] };
import { CLIENTS_FETCHED } from '../constants'

export default (state = CLIENTS_INITIAL_STATE, action) => {
    switch(action.type) {
        case CLIENTS_FETCHED:
            return { ...state, clients: action.payload.data };
        default:
            return state;
    }
}