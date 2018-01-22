import React from 'react'
import { hasError, addHelpBlock } from './formUtils'

export default props => (
    <div className={'form-group ' + hasError(props)}>
        <input {...props.input}
            className='form-control'
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type} />
            {addHelpBlock(props)}
    </div>
);