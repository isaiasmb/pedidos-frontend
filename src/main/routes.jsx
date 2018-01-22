import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Order from '../orders/order'

export default props => (
    <Router history={hashHistory}>
        <Route path='/orders' component={Order} />
        <Redirect from='*' to='/orders' />
    </Router>
)