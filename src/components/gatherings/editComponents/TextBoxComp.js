import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
    theTitle,
    thePrompt,
    identifier,
    theValue,
    handleChange,
}) => (
    <div>
        <h4>{theTitle}</h4>
        <input
            type='text'
            class='x-large'
            placeholder={thePrompt}
            id={identifier}
            name={identifier}
            value={theValue}
            onChange={handleChange}
        />
    </div>
);
TextBox.propTypes = {
    theTitle: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    thePrompt: PropTypes.string.isRequired,
    theValue: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default TextBox;
