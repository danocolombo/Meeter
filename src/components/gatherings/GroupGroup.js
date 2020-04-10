import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/group';

/* eslint react/prop-types: 0 */
const GroupGroup = ({ groups, gathering }) => {
    return [
        <Fragment>
            {groups.map(g => (
                <div className={'PersonBox'}>
                    <span className={'grpBoxTitle'}>
                        {/* <Link to={`/EditGroup/${gathering._id}/${g._id}`}> */}
                        {g.title}
                        {/* </Link> */}
                    </span>
                    <span className={'grpBoxAttendance'}>{g.attendance}</span>
                    <br />
                    <div>
                        {g.location} - {g.facilitator}
                    </div>
                </div>
            ))}
        </Fragment>
    ];
};
GroupGroup.propTypes = {
    // auth: PropTypes.object.isRequired,
    gathering: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
};
const mapStateToProps = state => {
    return {
        gathering: state.gathering.gathering,
        groups: state.group.groups
    };
};

export default connect(mapStateToProps)(GroupGroup);

// [
//     gatherings.map(gathering => (
//         <GatheringItem key={gathering._id} gathering={gathering} />
//     ))
// ];
