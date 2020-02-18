import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PersonItem = ({ person: { _id, name, email, phone } }) => (
    <div className='PersonBox'>
        <div>
            {name}
            <br />
            {/* only show phone field if there is a number for the user */}
            {phone ? (
                <Fragment>
                    <i className='fas fa-phone-square'></i>&nbsp;&nbsp;
                    {phone}
                    <br />
                </Fragment>
            ) : (
                <font></font>
            )}
            {email ? (
                <Fragment>
                    <i className='fas fa-envelope-square'></i>&nbsp;&nbsp;
                    {email}
                    <br />
                </Fragment>
            ) : (
                <font></font>
            )}
        </div>
    </div>
);

PersonItem.propTypes = {
    person: PropTypes.object.isRequired
};

export default connect(null, {})(PersonItem);
//post bg-white p-1 my-1
