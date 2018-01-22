import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { getList, showUpdate, deleteOrder } from './orderActions'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class OrderList extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            selectedOrder: {id: null}
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(order) {
        this.setState({ selectedOrder: order });
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    deleteOrder() {
        this.closeModal();
        this.props.deleteOrder(this.state.selectedOrder.id);
    }

    componentWillMount() {
        this.props.getList();
    }

    renderRows() {
        const orders = this.props.orders || []
        return orders.map(order => (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client.name}</td>
                <td>{order.items.length}</td>
                <td>
                    <div className='table-buttons'>
                        <button className='btn btn-warning' onClick={() => this.props.showUpdate(order)}>
                            <i className='fa fa-pencil'></i>
                        </button>

                        <button className='btn btn-danger' onClick={() => this.openModal(order)}>
                            <i className='fa fa-trash-o'></i>
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    contentLabel="Exclusão"
                    onAfterOpen={this.afterOpenModal}>
                    <div>
                        <h3>Deseja excluir o pedido {this.state.selectedOrder.id}?</h3>
                        <div className='modal-buttons'>
                            <button className='btn btn-primary' onClick={() => this.closeModal()}>Não</button>
                            <button className='btn btn-danger' onClick={() => this.deleteOrder()}>Sim</button>
                        </div>
                    </div>
                </Modal>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cliente</th>
                            <th>Quantidade de itens</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({ orders: state.order.list });
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, deleteOrder }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);