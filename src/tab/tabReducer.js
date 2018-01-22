const INITIAL_STATE = { selected: '', visible: {} }
import { TAB_SELECTED, TAB_SHOWED } from '../constants'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAB_SELECTED:
            return { ...state, selected: action.payload }
        case TAB_SHOWED:
            return { ...state, visible: action.payload }
        default:
            return state
    }
}