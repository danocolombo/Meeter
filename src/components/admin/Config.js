import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//--------------------------------------
//these are for the  expansion panels
import { Accordion } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';

//--------------------------------------

import DefaultGroup from './DefaultGroup';
import ClientUser from './ClientUser';
import MeetingConfigForm from './MeetingConfigForm';

import { getClientUsers, getDefGroups } from '../../actions/admin';
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
    historyView,
}) => {
    // let theClient = [];
    // let theDefaultGroups = [];
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleAddGroupClick = () => {
        console.log('Please Add Group');
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;System
                    Configuration
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
                        <h1>
                            Default Group Definitions{' '}
                            {expanded === 'panel1' ? (
                                <i className='fa fa-sort-down'></i>
                            ) : (
                                <i className='fa fa-sort-up'></i>
                            )}
                        </h1>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='posts'>
                            {defaultGroups ? (
                                <>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {defaultGroups.map(
                                                        (dGroup) => (
                                                            <DefaultGroup
                                                                key={
                                                                    dGroup.groupId
                                                                }
                                                                defGroup={
                                                                    dGroup
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div
                                        className={
                                            'config-page__add-default-group-row'
                                        }
                                        onClick={() => handleAddGroupClick()}
                                    >
                                        <NavLink
                                            to='/EditDefaultGroups'
                                            className={
                                                'config-page__new-group-nav-link'
                                            }
                                        >
                                            <div
                                                className={
                                                    'config-page__add-icon'
                                                }
                                            >
                                                <i
                                                    key='two'
                                                    className='material-icons'
                                                >
                                                    add_circle_outline
                                                </i>
                                            </div>
                                            <div
                                                className={
                                                    'config-page__add-words'
                                                }
                                            >
                                                Add New Default Group
                                            </div>
                                        </NavLink>
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
                        <h1>
                            Registered Users{' '}
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
                        <h1>
                            Meeting Configurations{' '}
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
