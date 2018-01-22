import React from 'react'

import '../template/dependencies'

import Header from '../template/layout/header'
import Sidebar from '../template/layout/sidebar/sidebar'
import Footer from '../template/layout/footer'
import Routes from './routes'
import Toastr from '../message/toastr'

export default props => (
    <div className='wrapper'>
        <Header />
        <Sidebar />
        <div className='content-wrapper'>
            <Routes />
        </div>
        <Footer />
        <Toastr />
    </div>
);