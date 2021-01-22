import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Button } from '@material-ui/core';
//--------------------------------------
//these are for expansion panels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//--------------------------------------
import Modal from '../layout/Modal/Modal';
import UserConfirm from './UserConfirm';
import UserReject from './UserReject';
import DefaultGroup from './DefaultGroup';
import DefaultGroupDelete from './DefaultGroupDeleteConfirm';
import ClientUser from './ClientUser';
import DefaultGroupEdit from './DefaultGroupForm';
import DefaultGroupAdd from './DefaultGroupAdd';
import MeetingConfigForm from './MeetingConfigForm';
import {
    getClientUsers,
    getDefGroups,
    // getMtgConfigs,
    grantUserRegistration,
    rejectUserRegistration,
    deleteDefaultGroup,
    updateDefaultGroup,
} from '../../actions/admin';
import DefaultGroups from './DefaultGroup';
// import { set } from 'mongoose';

const Administration = ({
    getDefGroups,
    // getMtgConfigs,
    getClientUsers,
    grantUserRegistration,
    rejectUserRegistration,
    deleteDefaultGroup,
    updateDefaultGroup,
    auth: { activeClient, activeRole, activeStatus },
    meeter: { defaultGroups, clientUsers, loading, mtgConfigs, active },
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            getClientUsers(activeClient);
            getDefGroups(activeClient);
            // getMtgConfigs(activeClient);
        }
    }, [activeClient, getClientUsers, getDefGroups]);
    // const classes = useStyles();
    const [modalDefaultGroups, setGroupsModal] = useState(false);
    const [confirmGroupDeleteModal, setGroupDeleteModal] = useState(false);
    const [editGroupModal, setGroupEditModal] = useState(false);
    const [addGroupModal, setAddGroupModal] = useState(false);
    const [grpId, setGrpId] = useState('');
    const [grpGender, setGrpGender] = useState('');
    const [grpTitle, setGrpTitle] = useState('');
    const [grpLocation, setGrpLocation] = useState('');
    const [grpFacilitator, setGrpFacilitator] = useState('');

    const [modalAction, setModalAction] = useState('');
    const [userSelected, setUserSelected] = useState('');
    const [userNameSelected, setUserNameSelected] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // this initially hides the modal...
    const [showConfirmModal, setModal] = useState(false);
    const [showRejectModal, setRejectModal] = useState(false);
    // const [userId, setUserId] = useState('');
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleApproval = (id, name, email) => {
        // this is coming back from the UI showing the register request.
        if (showRejectModal !== true) {
            setModalAction('approveUser');
            setModal(true); //show modal to grant access.
            setUserEmail(email);
            setUserSelected(id);
            setUserNameSelected(name);
        }
    };
    const handleRejection = (id, name, email) => {
        // this is coming back from the UI list showing the register request.
        if (showConfirmModal !== true) {
            setUserSelected(id);
            setUserNameSelected(name);
            setUserEmail(email);
            setRejectModal(true);
        }
    };
    const setRoleOfUser = (r) => {
        // this is coming back from modal with role assigned.
        if (r !== 'CANCEL') {
            grantUserRegistration(activeClient, userSelected, r, userEmail);
        }
        setModal(false); // hide modal
    };
    const deleteRegistrationRequest = (r) => {
        // this is coming back from the UI as delete request.
        if (r !== 'CANCEL') {
            console.log('########################################');
            console.log('DisplaySecurity :: deleteRegistrationRequest');
            console.log('id: ' + userSelected);
            console.log('user: ' + userNameSelected);
            console.log('email: ' + userEmail);
            console.log('Now we call api to delete user record.');
            console.log('########################################');
            rejectUserRegistration(activeClient, userSelected, userEmail);
        }
        setRejectModal(false);
    };
    // Default Group functions
    //==========================
    const clearGroupStates = () => {
        setGrpId('');
        setGrpGender('');
        setGrpTitle('');
        setGrpLocation('');
        setGrpFacilitator('');
    };
    const handleGroupSelect1 = (k, g, t, l, f) => {
        // this is from DefaultGroup sending
        // key (k) to edit.
        setGrpId(k);

        // setGrpGender(defaultGroups[k].gender);
        // setGrpTitle(defaultGroups[k].title);
        // setGrpLocation(defaultGroups[k].location);
        // setGrpFacilitator(defaultGroups[k].facilitator);
        console.log('Going to edit ' + k);
    };
    const handleGroupDelete = (k, g, t, l, f) => {
        // this is from DefaultGroup sending
        // key (k) to delete. Throw DeleteConfirm modal

        setGrpId(k);
        setGrpGender(g);
        setGrpTitle(t);
        setGrpLocation(l);
        setGrpFacilitator(f);
        console.log('Need to confirm delete: ' + k);
        if (!showConfirmModal && !showRejectModal) {
            setGroupDeleteModal(true);
        }
    };
    const handleGroupDeleteResponse = (r) => {
        if (r === 'DELETE') {
            console.log(
                'going to call removeDefGroup(' +
                    activeClient +
                    ', ' +
                    grpId +
                    ')'
            );
            deleteDefaultGroup(activeClient, grpId);

            console.log('DELETING =>' + grpId);
        } else {
            console.log('No delete');
        }
        clearGroupStates();

        setGroupDeleteModal(false);
    };
    const handleGroupEdit = (k, g, t, l, f) => {
        // this is coming back from list
        setGrpId(k);
        setGrpGender(g);
        setGrpTitle(t);
        setGrpLocation(l);
        setGrpFacilitator(f);
        console.log('going to edit ' + k);
        setGroupEditModal(true);
    };
    const handleGroupEditResponse = (r, i, g, t, l, f) => {
        console.log('handleGroupEditResponse received...');
        console.log(r + ':' + i + ':' + g + ':' + t + ':' + l + ':' + f);
        //this is coming back from the edit dialog
        if (r != 'CANCEL') {
            // r, id, gender, title, location, facilitator;
            const revised = {};
            revised._id = grpId;
            revised.cid = activeClient;
            revised.gender = g;
            revised.title = t;
            revised.location = l;
            revised.facilitator = f;
            updateDefaultGroup(revised);
            console.log('save the edits');
        } else {
            console.log('no updates, cancelled');
        }
        setGroupEditModal(false);
        // if (!confirmGroupDeleteModal) setGroupEditModal(true);
        // clearGroupStates();
    };
    const handleGroupAddRequest = () => {
        // this is coming back from list
        clearGroupStates();
        setAddGroupModal(true);
    };
    const handleGroupAddResponse = (r, g, t, l, f) => {
        //the resonse will either be SAVE or CANCEL
        if (r !== 'CANCEL') {
            //add the meeting
            const newGroup = {};
            newGroup.cid = activeClient;
            newGroup.gender = g;
            newGroup.title = t;
            l ? (newGroup.location = l) : (newGroup.location = '');
            f ? (newGroup.facilitator = f) : (newGroup.facilitator = '');
            updateDefaultGroup(newGroup);
        }
        setAddGroupModal(false);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-cog'></i>&nbsp;&nbsp;Configurations
                </h2>
            </div>
            <p>
                On this page you will find a variety of configurations and
                settings to manage your application.
            </p>

            <div className='medium'>
                <ExpansionPanel
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Default Groups</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Modal show={editGroupModal}>
                            <DefaultGroupEdit
                                handleResponse={handleGroupEditResponse}
                                _idValue={grpId}
                                genderValue={grpGender}
                                titleValue={grpTitle}
                                locationValue={grpLocation}
                                facilitatorValue={grpFacilitator}
                            />
                        </Modal>
                        <Modal show={confirmGroupDeleteModal}>
                            <DefaultGroupDelete
                                confirmDeleteResonse={handleGroupDeleteResponse}
                                genderValue={grpGender}
                                titleValue={grpTitle}
                                locationValue={grpLocation}
                                facilitatorValue={grpFacilitator}
                            />
                        </Modal>
                        <Modal show={addGroupModal}>
                            <DefaultGroupAdd
                                handleGroupAdd={handleGroupAddResponse}
                            />
                        </Modal>
                        <div className='posts'>
                            {defaultGroups ? (
                                <Fragment>
                                    <p>
                                        The default groups provide the ability
                                        to add common groups to meetings with a
                                        simple tap of your finger.
                                    </p>
                                    <br />
                                    {defaultGroups.map((dGroup) => (
                                        <>
                                            <DefaultGroup
                                                key={dGroup._id}
                                                mtgConfig={dGroup}
                                                handleEdit={handleGroupEdit}
                                                handleDelete={handleGroupDelete}
                                            />
                                        </>
                                    ))}
                                    <div>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            size='small'
                                            onClick={handleGroupAddRequest}
                                        >
                                            New Default Group
                                        </Button>
                                    </div>
                                </Fragment>
                            ) : null}
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
                        <Modal show={showConfirmModal}>
                            <UserConfirm
                                handleAction={setRoleOfUser}
                                userName={userNameSelected}
                            />
                        </Modal>
                        <Modal show={showRejectModal}>
                            <UserReject
                                handleAction={deleteRegistrationRequest}
                                userName={userNameSelected}
                            />
                        </Modal>
                        <div className='posts'>
                            {clientUsers ? (
                                <table>
                                    <thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {clientUsers.map((user) => (
                                                    <ClientUser
                                                        key={user._id}
                                                        user={user}
                                                        approveAction={
                                                            handleApproval
                                                        }
                                                        deleteAction={
                                                            handleRejection
                                                        }
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
                                    <p>
                                        Feature unavailable, check with syste
                                        adminstator
                                    </p>
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

Administration.defaultProps = {
    historyView: false,
};
Administration.propTypes = {
    meeter: PropTypes.object.isRequired,
    getClientUsers: PropTypes.func.isRequired,
    getDefGroups: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
    // removeDefGroup: PropTypes.func.isRequired,
    grantUserRegistration: PropTypes.func.isRequired,
    rejectUserRegistration: PropTypes.func.isRequired,
    updateDefaultGroup: PropTypes.func.isRequired,
    deleteDefaultGroup: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});
export default connect(mapStateToProps, {
    getClientUsers,
    getDefGroups,
    grantUserRegistration,
    rejectUserRegistration,
    deleteDefaultGroup,
    updateDefaultGroup,
})(Administration);
