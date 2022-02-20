import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupComponent from './group-component';
import { Button } from '@mui/material';
import Modal from '../../../modals/wrapper.modal';
import EditDefaultGroup from '../../../modals/admin/admin-edit-default-group.component';
import './groups-component.styles.scss';
import {
    addDefaultGroup,
    removeDefaultGroup,
    updateDefaultGroup,
} from '../../../../actions/admin';
const GroupsComponent = ({
    clientId,
    defaultGroups,
    addDefaultGroup,
    updateDefaultGroup,
    removeDefaultGroup,
}) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const onGroupUpdate = (updatedGroup) => {
        //add the client and send the group to be updated

        updateDefaultGroup(clientId, updatedGroup);
        // alert('groups:update:' + clientId + '/' + updatedGroup.groupId);
    };
    const onGroupDelete = (groupId) => {
        setModalIsVisible(false);
        removeDefaultGroup(clientId, groupId);
    };
    const onNewGroup = (newGroup) => {
        setModalIsVisible(false);
        addDefaultGroup(clientId, newGroup);
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
                        key={clientId}
                        group={{
                            grpId: '0',
                            grpGender: '',
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
    addDefaultGroup: PropTypes.func.isRequired,
    removeDefaultGroup: PropTypes.func.isRequired,
    updateDefaultGroup: PropTypes.func.isRequired,
};
export default connect(null, {
    addDefaultGroup,
    removeDefaultGroup,
    updateDefaultGroup,
})(withRouter(GroupsComponent));
