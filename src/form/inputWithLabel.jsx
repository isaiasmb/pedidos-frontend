import React from 'react'
import Grid from '../template/layout/grid'
import { hasError, addHelpBlock } from './formUtils'

export default props => (
    <Grid cols={props.cols}>
        <div className={'form-group ' + hasError(props)}>
            <label htmlFor={props.name}>{props.label}</label>
            <input {...props.input} className='form-control'
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type} />
                {addHelpBlock(props)}
        </div>
    </Grid>
)