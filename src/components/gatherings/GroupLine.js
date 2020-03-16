import React, { Fragment } from 'react';

import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import plusSign from '../../img/red-cross.png';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/gathering';

const GroupLine = ({ grp, deleteGroup }) => {
    const grps = grp.map(group => (
        <tr key={group.id}>
            <td>
                {group.gender} {group.title}
            </td>
            <td>{group.facilitator}</td>
            <td>{group.attendance}</td>
            <td>
                <Link to='#'>
                    <Icon style={{ color: red[500] }}>delete</Icon>
                </Link>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-1'>
                Open Share Groups{''}
                <Link to='/EditGroup/0'>
                    <Icon style={{ color: green[500] }}>add_circle</Icon>
                </Link>
            </h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Facilitator</th>
                        <th>#</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{grps}</tbody>
            </table>
        </Fragment>
    );
};

GroupLine.propTypes = {
    grp: PropTypes.array.isRequired,
    deleteGrouup: PropTypes.func.isRequired
};

export default connect(null, { deleteGroup })(GroupLine);
