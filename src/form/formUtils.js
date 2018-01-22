import React from 'react'

export const required = value => value ? undefined : 'Campo obrigatório';
export const requiredSelect = value => value === 0 ? undefined : 'Campo obrigatório';

export function hasError(props) {
    if (props.meta.touched) {
        if (props.meta.error) {
            return 'has-error';
        } else if (props.meta.warning) {
            return 'has-warning';
        }
    }
    return '';
}

export function addHelpBlock(props) {
    return props.meta.touched && ((props.meta.error && <span className='help-block'>{props.meta.error}</span>) || 
                (props.meta.warning && <span className='help-block'>{props.meta.warning}</span>));
}
