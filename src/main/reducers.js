import { combineReducers } from 'redux'
import { reducer  as form } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import TabReducer from '../tab/tabReducer'
import OrderReducer from '../orders/orderReducer'
import ClientReducer from '../clients/clientReducer'
import ProductReducer from '../products/productReducer'

const rootReducer = combineReducers({
    order: OrderReducer,
    client: ClientReducer,
    product: ProductReducer,
    tab: TabReducer,
    toastr: toastrReducer,
    form: form
})

export default rootReducer