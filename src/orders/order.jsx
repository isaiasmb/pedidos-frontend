import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/layout/contentHeader'
import Content from '../template/layout/content'
import Tabs from '../tab/tabs'
import TabsHeader from '../tab/tabsHeader'
import TabsContent from '../tab/tabsContent'
import TabHeader from '../tab/tabHeader'
import TabContent from '../tab/tabContent'
import { init, create, update } from './orderActions'

import Orders from './orderList'
import Form from './orderForm'

class Order extends Component {

    componentWillMount() {
        this.props.init();
    }

    render() {
        return (
            <div>
                <ContentHeader title='Pedidos' small='Cadastro' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Novo' icon='plus' target='tabCreate' />
                            <TabHeader label='Editar' icon='pencil' target='tabUpdate' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <Orders />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create} />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update} />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init, create, update
}, dispatch)
export default connect(null, mapDispatchToProps)(Order)