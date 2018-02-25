import React, { Component } from 'react'
import { Field, arrayInsert, arrayRemove, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/layout/grid'
import Select from '../form/select'
import Input from '../form/input'
import { loadProducts } from '../products/productActions'
import { required, requiredSelect, formatMoney, parseMoney } from '../form/formUtils'

class ItemList extends Component {

    constructor() {
        super();

        this.state = {
            profitability: ""
        };

        this.updateProfitability = this.updateProfitability.bind(this);
    }

    componentWillMount() {
        this.props.loadProducts();
    }

    updateProfitability(profitability) {
        this.setState({ profitability: profitability });
    }

    renderRows() {
        const items = this.props.items || [];
        return items.map((item, index) => (
            <tr key={index}>
                <td>
                    <Field name={`items[${index}].product.id`}
                        parse={value => Number(value)} component={Select}
                        defaultValue={0} value={this.props.product}
                        options={this.createOptionsProducts(index)}
                        labelDefaultOptions='Selecione um produto'
                        validate={[required]} />
                </td>
                <td><Field name={`items[${index}].amount`} component={Input} validate={[required]} /></td>
                <td>
                    <Field name={`items[${index}].unitPrice`} 
                        format={value => formatMoney(value)}
                        parse={value => parseMoney(value)}
                        component={Input} 
                        validate={[required]} />
                </td>
                <td><Field readOnly={true} name={`items[${index}].profitability`} component={Input} format={value => this.formatProfitability(value)} /></td>
                <td>
                    <button type='button' className='btn btn-success'
                        onClick={() => this.addItem(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={() => this.removeItem(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    formatProfitability(value) {
        switch (value) {
            case 'GREAT':
                return "Ótima";
            case "GOOD":
                return "Boa";
            case "BAD":
                return "Ruim";
        }
    }

    addItem(index, item = {}) {
        this.props.arrayInsert('orderForm', 'items', index, item);
    }

    removeItem(index) {
        if (this.props.items.length > 1) {
            this.props.arrayRemove('orderForm', 'items', index);
        }
    }

    createOptionsProducts(index) {
        const currentItems = this.props.items.length > 0 ? this.props.items : [{ product: { id: null } }];
        const products = this.props.products || [];
        return products.map(product => (
            <option key={product.id} value={product.id}
                selected={currentItems[index].product !== undefined && product.id == currentItems[index].product.id}>
                {product.name} - {product.unitPrice}
            </option>
        ));
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>Itens</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço unitário</th>
                                <th>Rentabilidade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}
const selector = formValueSelector('orderForm');
const mapStateToProps = state => ({
    products: state.product.products,
    items: selector(state, 'items')
});
const mapDispatchToProps = dispatch => bindActionCreators({
    arrayInsert,
    arrayRemove,
    loadProducts
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);