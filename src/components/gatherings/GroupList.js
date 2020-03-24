import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups, deleteGroup } from '../../actions/group';
import Axios from 'axios';

const GroupList = ({ group: { groups, loading }, mid, getGroups, history }) => {
    useEffect(() => {
        if (!groups) getGroups(mid);
    }, [getGroups, loading, groups]);
    return (
        <Fragment>
            <h2>WHAT??</h2>
            if (groups){' '}
            {/* {groups.map(grp => (
                <div>id: {grp._id}</div>
            ))} */}
        </Fragment>
    );
};

GroupList.propTypes = {
    mid: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    groups: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    group: state.group,
    groups: state.groups
});
export default connect(mapStateToProps, { getGroups, deleteGroup })(GroupList);
