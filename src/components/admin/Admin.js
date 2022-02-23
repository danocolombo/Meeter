import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//--------------------------------------
//these are for the  expansion panels
import { Accordion } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';

//--------------------------------------
import UserComponent from './components/users/user.component';
import MeetingConfigForm from './components/configs/MeetingConfigForm';
import GroupsComponent from './components/groups/groups-component';
import ConfigsComponent from './components/configs/configs-component';

import {
    getClientUsers,
    getDefGroups,
    updateUserCredentials,
} from '../../actions/admin';
import { getMtgConfigs } from '../../actions/administration';

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
    updateUserCredentials,
    historyView,
}) => {
    // let theClient = [];
    // let theDefaultGroups = [];
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleUserUpdate = (userUpdates) => {
        // console.log('User Updates\n', userUpdates);
        userUpdates.client = clientCode;
        userUpdates.clientId = clientId;
        let theOne = clientUsers.filter(
            (user) => user.userId === userUpdates.userId
        );
        let userHistory = theOne[0];
        updateUserCredentials(userUpdates, userHistory);
    };

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;SysCon
                </h2>
            </div>
            <p>System Management Console</p>
            <div className='medium'>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>
                            Groups{' '}
                            {expanded === 'panel1' ? (
                                <i className='fa fa-sort-down'></i>
                            ) : (
                                <i className='fa fa-sort-up'></i>
                            )}
                        </h1>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div>
                            {defaultGroups ? (
                                <GroupsComponent
                                    clientId={clientId}
                                    defaultGroups={defaultGroups}
                                />
                            ) : null}
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>
                            Users{' '}
                            {expanded === 'panel2' ? (
                                <i className='fa fa-sort-down'></i>
                            ) : (
                                <i className='fa fa-sort-up'></i>
                            )}
                        </h1>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='posts'>
                            {clientUsers ? (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {clientUsers.map((user) => (
                                                    <UserComponent
                                                        key={user.userId}
                                                        user={user}
                                                        onUserUpdate={
                                                            handleUserUpdate
                                                        }
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>
                            Configurations{' '}
                            {expanded === 'panel3' ? (
                                <i className='fa fa-sort-down'></i>
                            ) : (
                                <i className='fa fa-sort-up'></i>
                            )}
                        </h1>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='posts'>
                            {active.role === 'superuser' ||
                            active.role === 'owner' ? (
                                <ConfigsComponent
                                    clientId={clientId}
                                    clientConfigs={clientConfigs}
                                />
                            ) : (
                                <Fragment>
                                    <p>Feature coming soon...</p>
                                    <br />
                                    <br />
                                </Fragment>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Fragment>
    );
};

SystemConfig.defaultProps = {
    historyView: false,
};
SystemConfig.propTypes = {
    meeter: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    //defaultGroups: PropTypes.object.isRequired,
    getClientUsers: PropTypes.func.isRequired,
    getDefGroups: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
    updateUserCredentials: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    meeter: state.meeter,
    client: state.client,
    //defaultGroups: state.client.defaultGroups,
});
export default connect(mapStateToProps, {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
    updateUserCredentials,
})(SystemConfig);
