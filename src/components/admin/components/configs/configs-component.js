import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfigComponent from './config-component';

//import { updateConfig } from '../../../../actions/admin';
import './configs-component.styles.scss';
const ConfigsComponent = ({ clientId, clientConfigs, onConfigUpdate }) => {
    const handleConfigUpdate = (newConfig) => {
        //add the client and send the group to be updated
        onConfigUpdate(newConfig);
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
export default ConfigsComponent;
// ConfigsComponent.propTypes = {
//     updateConfig: PropTypes.func.isRequired,
// };
// export default connect(null, {
//     updateConfig,
// })(withRouter(ConfigsComponent));
