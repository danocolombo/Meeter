import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '../../../modals/wrapper.modal';
import EditDefaultGroup from '../../../modals/admin/admin-edit-default-group.component';
import { saveTmpDefaultGroup } from '../../../../actions/group';
import './configs-component.styles.scss';
const ConfigComponent = ({ setting, value, onConfigUpdate }) => {
    const handleUpdateRequest = (updatedSetting) => {
        onConfigUpdate(updatedSetting);
    };
    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={value}
                        onChange={handleUpdateRequest}
                        name='setting'
                        color='primary'
                    />
                }
                label={setting}
            /><br/>
        </>
    );
};
ConfigComponent.propTypes = {
    saveTmpDefaultGroup: PropTypes.func.isRequired,
};
export default connect(null, { saveTmpDefaultGroup })(ConfigComponent);
