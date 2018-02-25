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

export function formatMoney(value) {
    if (!value) return value;
    value = String(value);
    let onlyNums = value.replace(/[^0-9]/g, '');

    let formatNum = "";
    for (let i = 0; i < onlyNums.length; i++) {
        if (i == 12) break;
        let num = onlyNums.charAt(i);

        if ((i == 1 && (onlyNums.length == 2 || onlyNums.length == 3)) || i + 2 == onlyNums.length) {
            formatNum = formatNum.replace(',', '');
            formatNum += "," + num;
        } else {
            formatNum += num;
        }

        if ((i == 0 && onlyNums.length == 6) || i + 6 == onlyNums.length || i + 9 == onlyNums.length || i + 12 == onlyNums.length) {
            if (onlyNums.length <= 8) {
                formatNum = formatNum.replace('.', '');
            }
            
            formatNum += '.';
        }
    }
    return "R$ " + formatNum;
}

export function parseMoney(value) {
    value = value.replace(/[^0-9,]/g, '');
    value = value.replace(',', '.');
    return value;
}