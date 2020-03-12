import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePerson } from '../../actions/person';

const PersonItem = ({ deletePerson, person: { _id, name, email, phone } }) => (
    <div className='PersonBox'>
        <div className='DeleteTarget'>
            <a
                id='deletePerson'
                title='-'
                href='/#'
                onClick={() => deletePerson(_id)}
            >
                <i className='fas fa-minus-circle'></i>
            </a>
        </div>
        <div>
            <Link to={`/EditPerson/${_id}`}>{name}</Link>
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
    person: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired
};

export default connect(null, { deletePerson })(PersonItem);
//post bg-white p-1 my-1
