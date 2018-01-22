import React from 'react'
import Grid from '../template/layout/grid'
import { hasError, addHelpBlock } from './formUtils'

export default props => (   
    <Grid cols={props.cols}>
        <div className={'form-group ' + hasError(props)}>
            {createLabel(props)}
            <select {...props.input} className='form-control'
                value={props.value} 
                placeholder={props.placeholder}
                readOnly={props.readOnly}>
                <option value={0}>{props.labelDefaultOptions}</option>
                {props.options}
            </select>
            {addHelpBlock(props)}
        </div>
    </Grid>
)

function createLabel(props) {
    if (props.label != undefined) {
        return (<label htmlFor={props.name}>{props.label}</label>);
    } else {
        return false;
    }
}