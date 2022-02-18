import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GroupComponent from './group-component';
import { Button } from '@mui/material';
import Modal from '../../../modals/wrapper.modal';
import EditDefaultGroup from '../../../modals/admin/admin-edit-default-group.component';
import './groups-component.styles.scss';
const GroupsComponent = ({ clientId, defaultGroups, removeDefaultGroup }) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const onGroupUpdate = (updatedGroup) => {
        alert('groups:update:' + clientId + '/' + updatedGroup.groupId);
    };
    const onGroupDelete = (groupId) => {
        alert('groups:delete:' + clientId + '/' + groupId);
    };
    const onNewGroup = (newGroup) => {
        alert('groups:addNewGroup:' + newGroup.title);
    };
    return (
        <>
            {defaultGroups.map((dGroup) => (
                <GroupComponent
                    key={dGroup.groupId}
                    group={dGroup}
                    onGroupDelete={onGroupDelete}
                    onGroupUpdate={onGroupUpdate}
                />
            ))}
            <Button
                variant='contained'
                color='success'
                onClick={() => setModalIsVisible(true)}
            >
                Add New Group
            </Button>
            <Modal isOpened={modalIsVisible}>
                <div>
                    <EditDefaultGroup
                        group={{
                            grpId: 0,
                            grpGender: 'x',
                            grpTitle: '',
                            grpFacilitator: '',
                            grpLocation: '',
                        }}
                        onCancel={() => setModalIsVisible(false)}
                        onUpdate={onNewGroup}
                    />
                </div>
            </Modal>
        </>
    );
};
GroupsComponent.propTypes = {
    // defaultGroups: PropTypes.array.isRequired,
    // removeDefaultGroup: PropTypes.func.isRequired,
};
export default GroupsComponent;
