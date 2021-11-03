import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//--------------------------------------
//these are for expansion panels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
    meeter: { active, defaultGroups, clientUsers, mtgConfigs, loading },
    historyView,
}) => {
    useEffect (() => {
        //this is on page load
        // console.log("SystemConfig_useEffect (PL) (activeClient: " + active.client + ")");
    },[]);
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
            <p>This will be the security information for {active.client}</p>

            <div className='medium'>
                <ExpansionPanel
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Default Group Definitions</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <div className='posts'>
                            {defaultGroups ? (
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            {defaultGroups.map((dGroup) => (
                                                <DefaultGroup
                                                    key={dGroup.group_id}
                                                    defGroup={dGroup}
                                                />
                                            ))}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Registered Users</h1>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Meeting Configurations</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Fragment>
    );
};

SystemConfig.defaultProps = {
    historyView: false,
};
SystemConfig.propTypes = {
    meeter: PropTypes.object.isRequired,
    getClientUsers: PropTypes.func.isRequired,
    getDefGroups: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    meeter: state.meeter,
});
export default connect(mapStateToProps, {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
})(SystemConfig);
