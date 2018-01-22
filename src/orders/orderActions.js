import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { showTabs, selectTab } from '../tab/tabActions'
import { reset as resetForm, initialize } from 'redux-form'
import { BASE_URL, ORDERS_FETCHED } from '../constants'

const INITIAL_VALUES = {items: [{}]};

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('orderForm', INITIAL_VALUES)
    ];
}

export function getList() {
    const request = axios.get(`${BASE_URL}/orders`);
    return {
        type: ORDERS_FETCHED,
        payload: request
    };
}

export function create(values) {
    return persist(values, 'post');
}

export function update(values) {
    return persist(values, 'put');
}

function persist(values, method) {
    const order = { ...values };
    if (typeof order.client === 'number') {
        order.client = { id: values.client };
    }
    return dispatch => {
        const id = order.id ? order.id : '';
        axios[method](`${BASE_URL}/orders/${id}`, order)
            .then(resp => {
                toastr.success('Sucesso', 'Pedido salvo com sucesso');
                dispatch(init());
            })
            .catch(e => {
                e.response.data.forEach(error => toastr.error('Erro', error.userMessage));
            });
    }
}

export function deleteOrder(id) {
    return dispatch => {
        axios.delete(`${BASE_URL}/orders/${id}`)
            .then(resp => {
                toastr.success('Sucesso', `Pedido ${id} excluído com sucesso`);
                dispatch(getList());
            })
            .catch(e => {
                e.response.data.forEach(error => toastr.error('Erro', error.userMessage));
            });
    }
}

export function showUpdate(order) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('orderForm', order)
    ];
}