import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from '../orders/orderActions'
import { loadClients } from '../clients/clientActions'
import Select from '../form/select'
import ItemList from './itemList'
import { required } from '../form/formUtils'

class OrderForm extends Component {

    componentWillMount() {
        this.props.loadClients();
    }

    render() {
        const { handleSubmit, pristine, items } = this.props;
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='client' parse={value => Number(value)} 
                           defaultValue={0} value={this.props.client} 
                           component={Select} label='Cliente' cols='12 6' 
                           options={this.createOptionsClient()}
                           labelDefaultOptions='Selecione um cliente'
                           validate={[required]} />
                    
                    <ItemList items={items} cols='12 12' />
                </div>
                <div className='box-footer'>
                    <div className='footer-buttons'>
                        <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                        <button type='submit' className='btn btn-primary'>Salvar</button>
                    </div>
                </div>
            </form>
        );
    }

    createOptionsClient() {
        const currentClient = this.props.client != undefined ? this.props.client : {};
        const clients = this.props.clients || [];
        return  clients.map(client => (
            <option key={client.id} value={client.id} selected={client.id == currentClient.id}>{client.name}</option>
        ));
    }
}

const selector = formValueSelector('orderForm');
const mapStateToProps = state => ({ 
    clients: state.client.clients, 
    client: selector(state, 'client'),
    items: selector(state, 'items')
});
const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    loadClients
}, dispatch)

OrderForm = reduxForm({ 
    form: 'orderForm',
    destroyOnUnmount: false
})(OrderForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm); 