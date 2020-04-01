import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/group';

/* eslint react/prop-types: 0 */
const GroupGroup = ({ groups }) => {
    return [
        <>
            <table>
                {groups.map(g => (
                    <tr>
                        <td className='groupsOpenShareListTable'>{g.title}</td>
                        <td>{g.facilitator}</td>
                    </tr>
                ))}
            </table>
        </>
    ];
};
GroupGroup.propTypes = {
    // auth: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired
};
const mapStateToProps = state => {
    console.log(state);
    return { groups: state.group.groups };
};

export default connect(mapStateToProps)(GroupGroup);

// [
//     gatherings.map(gathering => (
//         <GatheringItem key={gathering._id} gathering={gathering} />
//     ))
// ];
