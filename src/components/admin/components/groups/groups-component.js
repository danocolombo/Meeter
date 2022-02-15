import React from 'react';
import PropTypes from 'prop-types';
import GroupComponent from './group-component';
import './groups-component.styles.scss';
const GroupsComponent = ({ defaultGroups }) => {
    const deleteGroupHandler = () => {
        alert('DELETE GROUP REQUEST');
    };
    return (
        <>
            {defaultGroups.map((dGroup) => (
                <GroupComponent
                    key={dGroup.groupId}
                    group={dGroup}
                    onDeleteGroup={deleteGroupHandler}
                />
            ))}
        </>
        //     <div
        //     className={'config-page__add-default-group-row'}
        //     onClick={() => handleAddGroupClick()}
        //     >
        //     <NavLink
        //         to='/EditDefaultGroups'
        //         className={'config-page__new-group-nav-link'}
        //     >
        //         <div className={'config-page__add-icon'}>
        //             <i key='two' className='material-icons'>
        //                 add_circle_outline
        //             </i>
        //         </div>
        //         <div className={'config-page__add-words'}>
        //             Add New Default Group
        //         </div>
        //     </NavLink>
        // </div>
    );
};
GroupsComponent.propTypes = {
    defaultGroups: PropTypes.array.isRequired,
};
export default GroupsComponent;
