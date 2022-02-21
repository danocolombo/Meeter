import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfigComponent from './config-component';

import { updateConfig } from '../../../../actions/admin';
import './configs-component.styles.scss';
const ConfigsComponent = ({ clientId, clientConfigs, updateConfig }) => {
    // convert the clientConfigs object to a map to iterate over
    //const configurations = new Map(Object.entries(clientConfigs));
    const convertedValues = new Map(Object.entries(clientConfigs));
    // setup value to iterate over.
    let configs = [];
    let cnt = 0;
    convertedValues.forEach(function (value, key) {
        // console.log(key + ':' + value);
        let item = { key: cnt++, setting: key, value: value };
        configs.push(item);
    });

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
            {configs.map((cfg) => (
                <ConfigComponent
                    key={cfg.key}
                    setting={cfg.setting}
                    value={cfg.value}
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
