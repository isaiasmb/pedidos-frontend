import React from 'react'
import MenuItem from './menuItem'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='#orders' label='Pedidos' icon='cart-plus' />
    </ul>
);
