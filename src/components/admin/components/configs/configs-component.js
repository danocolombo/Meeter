import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfigComponent from './config-component';

import { updateConfig } from '../../../../actions/admin';
import './configs-component.styles.scss';
const ConfigsComponent = ({ clientId, clientConfigs, updateConfig }) => {
    const handleConfigUpdate = (newConfig) => {
        //add the client and send the group to be updated
        // updateConfig(newConfig)
        alert('configs-component:onConfigUpdate');
        return null;
    };
    return (
        <>
            <h2>Configurations</h2>
            {/* {clientConfigs.forEach(function (value, key) {
                console.log(key + ':' + value);
            })} */}
            {clientConfigs.map((cfg) => (
                <ConfigComponent
                    key={cfg.config}
                    config={cfg}
                    onConfigUpdate={handleConfigUpdate}
                />
            ))}
        </>
    );
};
ConfigsComponent.propTypes = {
    updateConfig: PropTypes.func.isRequired,
};
export default connect(null, {
    updateConfig,
})(withRouter(ConfigsComponent));
