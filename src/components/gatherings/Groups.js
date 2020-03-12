import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import moment from 'moment';
import { connect } from 'react-redux';
import { deleteGroup, editGroup } from '../../actions/gathering';

const Groups = ({ group, deleteGroup, editGroup }) => {
    const groups = group.map(exp => (
        <tr key={group._id}>
            <td>{group.gender}</td>
            <td className='hide-sm'>{group.title}</td>
            <td className='hide-sm'>{group.location}</td>
            <td>
                <button
                    onClick={() => editGroup(group._id)}
                    className='btn btn-success'
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteGroup(group._id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-2'>Open Share Groups</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Gender</th>
                        <th className='hide-sm'>Category</th>
                        <th className='hide-sm'>Location</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{groups}</tbody>
            </table>
        </Fragment>
    );
};

Groups.propTypes = {
    group: PropTypes.array.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired
};

export default connect(null, { deleteGroup, editGroup })(Groups);
