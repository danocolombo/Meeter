import React from 'react';
import './form-input-number.styles.scss';
const FormInputNumber = ({
    handleChange,
    label,
    name,
    value,
    ...otherProps
}) => (
    <div className='group'>
        <input
            type='number'
            id='quantity'
            name='quantity'
            min='1'
            max='300'
            value={value}
        />
        <span>{label}</span>
    </div>
);
export default FormInputNumber;
