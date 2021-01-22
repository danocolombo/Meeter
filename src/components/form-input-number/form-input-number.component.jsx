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
        <div className='numberInputArea'>
        <input className='numberInput'
        {...otherProps}
        /></div>
        <span>{label}</span>
    </div>
);
export default FormInputNumber;
