import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAConfig, configIsSet } from '../../actions/config';

const SystemConfig = ({
    meeter: { active, loading },
    //defaultGroups: { }
    client: {
        clientId,
        clientName,
        clientCode,
        defaultGroups,
        clientUsers,
        clientConfigs,
    },
    getAConfig,
    configIsSet,
    historyView,
}) => {
    const [cfgDonations, setCfgDonations] = useState('false');
    const [cfgAVContact, setAVContact] = useState('false');
    const [cfgYouth, setCfgYouth] = useState('false');
    const [cfgYouthCount, setYouthCount] = useState('false');

    // let theClient = [];
    // let theDefaultGroups = [];
    //const x = getAConfig(clientConfigs, 'donations');

    return (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;TEST
                </h2>
            </div>
            <p>TEST PAGE</p>
            {clientConfigs ? (
                configIsSet(clientConfigs, 'youth') ? (
                    <div>youth: TRUE </div>
                ) : (
                    <div>youth: FALSE </div>
                )
            ) : null}
            {clientConfigs ? (
                configIsSet(clientConfigs, 'donations') ? (
                    <div>donations: TRUE </div>
                ) : (
                    <div>donations: FALSE </div>
                )
            ) : null}
        </Fragment>
    );
};

SystemConfig.defaultProps = {
    historyView: false,
};
SystemConfig.propTypes = {
    meeter: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    meeter: state.meeter,
    client: state.client,
});
export default connect(mapStateToProps, {
    getAConfig,
    configIsSet,
})(SystemConfig);
