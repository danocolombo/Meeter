import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import moment from 'moment';
// import plusSign from '../../img/red-cross.png';
// import { connect } from 'react-redux';
// import { deleteGroup } from '../../actions/gathering';

const GroupList = ({ group: { title, location, facilitator, attendance } }) => (
    <Fragment>
        <h2>WHAT??</h2>
        <div className='PersonBox'>
            {title}
            <br />
            {location} - {facilitator}
        </div>
    </Fragment>
);

GroupList.propTypes = {
    group: PropTypes.array.isRequired
};

export default GroupList;
