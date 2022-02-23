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
const ConfigComponent = ({
    config: { key, config, setting, label },
    onConfigUpdate,
}) => {
    const handleUpdateRequest = (updatedSetting) => {
        onConfigUpdate(updatedSetting);
    };
    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={setting}
                        onChange={handleUpdateRequest}
                        name={config}
                        color='primary'
                    />
                }
                label={label}
            />
            <br />
        </>
    );
};
ConfigComponent.propTypes = {
    saveTmpDefaultGroup: PropTypes.func.isRequired,
};
export default connect(null, { saveTmpDefaultGroup })(ConfigComponent);
