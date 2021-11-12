import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//--------------------------------------
//these are for the  expansion panels
import { Accordion } from '@material-ui/core';
import {AccordionDetails} from '@material-ui/core';
import {AccordionSummary} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//--------------------------------------

import DefaultGroup from './DefaultGroup';
import ClientUser from './ClientUser';
import DefaultGroupForm from './DefaultGroupForm';
import MeetingConfigForm from './MeetingConfigForm';

import {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
} from '../../actions/admin';

const SystemConfig = ({
    meeter: { active, loading },
    //defaultGroups: { }
    client: { clientId, clientName, clientCode, defaultGroups, clientUsers, clientConfigs},
    historyView,
}) => {
    let theClient = [];
    let theDefaultGroups = [];
    // useEffect (() => {
    //     //this is on page load
    //     // console.log("SystemConfig_useEffect (PL) (activeClient: " + active.client + ")");
        
    // },[]);
    // useEffect (() => {
    //     //this is on page load
    //     // console.log("SystemConfig_useEffect (PL) (activeClient: " + active.client + ")");

    // },[client]);
    // useEffect(() => {
        
    //     // if (active.client) {
    //     //     getClientUsers(active.client);
    //     //     getDefGroups(active.client);
    //     //     getMtgConfigs(active.client);
    //     // }
    // }, [active, getClientUsers, getDefGroups, getMtgConfigs]);
    // const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;System Configuration
                </h2>
            </div>
            <p>This will be the security information for {clientName}</p>

            <div className='medium'>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Default Group Definitions</h1>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='posts'>

                            {defaultGroups ? (
                                <>
                                    <h2>got groups</h2>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                {defaultGroups.map((dGroup) => (
                                                    <DefaultGroup
                                                        key={dGroup.groupId}
                                                        defGroup={dGroup}
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className={"config-component__add-style"}>
                                        <i key='two' className='material-icons left green'>
                                            add_circle_outline
                                        </i>Add New Default Group
                                    </div>
                                </>
                            ) : null}
                            {/* {activeRole === 'superuser' ? (
                                <DefaultGroupForm />
                            ) : (
                                <Fragment>
                                    <p>Feature coming soon...</p>
                                    <br />
                                    <br />
                                </Fragment>
                            )} */}
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
                        <h1>Registered Users</h1>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='posts'>
                            {clientUsers ? (
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            {clientUsers.map((user) => (
                                                <ClientUser
                                                    key={user.userId}
                                                    user={user}
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
                        <h1>Meeting Configurations</h1>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='posts'>
                            {active.role === 'superuser' ||
                            active.role === 'owner' ? (
                                <MeetingConfigForm />
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
})(SystemConfig);
