import React from 'react';

const FormDate = ({ ...otherProps }) => {
    return (
        <div className='form-date'>
            <h4 className='form-date-label'>Meeting Date **</h4>
            <input className='form-date-input' type='date' {...otherProps} />
        </div>
    );
};

export default FormDate;
