import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function GroupGroup(props) {
    const meetings = useSelector(state => state.group);
    return (
        <div>
            <h3>Group-Group</h3>
            
            {/* <div>we are going to do this...</div>
            {console.log(typeof meeting)}
            { (meeting)?console.log('gotSomething'):console.log('nope')}
            { console.log(Object.getOwnPropertyNames)} */}
            {/* {group.map(grp => (
                <div>ok</div>
            ))} */}

            {/* if (groups){' '}
            {groups.map(grp => (
                <div>id: {grp._id}</div>
            ))} */}
        </div>
    );
}

GroupGroup.propTypes = {};

export default GroupGroup;
