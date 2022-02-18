import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '../../../modals/wrapper.modal';
import EditDefaultGroup from '../../../modals/admin/admin-edit-default-group.component';
import { saveTmpDefaultGroup } from '../../../../actions/group';
import './groups-component.styles.scss';
const GroupComponent = ({
    group: { groupId, gender, groupTitle, location, facilitator },
    onGroupUpdate,
    onGroupDelete,
}) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const handleUpdateRequest = (updatedGroup) => {
        setModalIsVisible(false);
        onGroupUpdate(updatedGroup);
    };
    const handleDeleteRequest = (groupId) => {
        setModalIsVisible(false);
        onGroupDelete(groupId);
    };
    return (
        <>
            <div className='group-item__wrapper'>
                <div className='group-item__container'>
                    <div className='group-item__delete-button-wrapper'>
                        <button
                            onClick={() => handleDeleteRequest(groupId)}
                            type='button'
                            className='group-item__delete-button'
                        >
                            <i className='fas fa-times' />
                        </button>
                    </div>
                    <div className='group-item__row'>
                        <div className='group-item__label'>
                            {gender === 'f' ? "Women's" : "Men's"} {groupTitle}
                        </div>
                    </div>
                    <div className='group-item__row'>
                        <span className='group-item__label'>Facilitator: </span>
                        <span className='group-item__value'>{facilitator}</span>
                    </div>
                    <div className='group-item__row'>
                        <span className='group-item__label'>Location: </span>
                        <span className='group-item__value'>{location}</span>
                    </div>
                    <Stack
                        direction='row'
                        className='group-item__button-wrapper'
                    >
                        <Button
                            variant='contained'
                            className='group-item__edit-button'
                            onClick={() => setModalIsVisible(true)}
                        >
                            EDIT
                        </Button>
                    </Stack>
                </div>
            </div>
            <Modal isOpened={modalIsVisible}>
                <div>
                    <EditDefaultGroup
                        key={groupId}
                        group={{
                            grpId: groupId,
                            grpGender: gender,
                            grpTitle: groupTitle,
                            grpFacilitator: facilitator,
                            grpLocation: location,
                        }}
                        onCancel={() => setModalIsVisible(false)}
                        onUpdate={handleUpdateRequest}
                    />
                </div>
            </Modal>
        </>
    );
};
GroupComponent.propTypes = {
    saveTmpDefaultGroup: PropTypes.func.isRequired,
};
export default connect(null, { saveTmpDefaultGroup })(GroupComponent);
