/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/group';

const GroupGroup = ({ group }) => {
    return [
        <>
        <div>GROUPGROUP</div>
        <div>DivDiv</div>
        group.map(g => (
            <div>{g.title}</div>
        ))
        </>
    ];
};
GroupGroup.propTypes = {
    // auth: PropTypes.object.isRequired,
    group: PropTypes.array.isRequired
};

export default connect(null, null)(GroupGroup);

// [
//     gatherings.map(gathering => (
//         <GatheringItem key={gathering._id} gathering={gathering} />
//     ))
// ];