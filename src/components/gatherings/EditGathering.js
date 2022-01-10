import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Button } from '@material-ui/core';
import {
    createGathering,
    getMeeting,
    addDefaultGroups,
    turnoffMeetingLoading,
} from '../../actions/gathering';
import { getGroups, clearGroups, deleteGroup, clearTmpGroup } from '../../actions/group';
import GatheringGroupListItem from './GatheringGroupListItem';
import { getMtgConfigs, getDefGroups } from '../../actions/admin';

import Spinner from '../layout/Spinner';

const initialState = {
    meetingId: '',
    clientId: '',
    meetingDate: '',
    facilitatorContact: '',
    meetingType: '',
    supportContact: '',
    title: '',
    worship: '',
    avContact: '',
    attendanceCount: 0,
    newcomersCount: 0,
    donations: 0,
    meal: '',
    mealContact: 'TBD',
    mealCount: 0,
    cafeContact: 'TBD',
    cafeCount: 0,
    greeterContact1: '',
    greeterContact2: '',
    resourceContact: '',
    announcementsContact: '',
    closingContact: '',
    securityContact: '',
    setupContact: '',
    cleanupContact: '',
    transportationContact: '',
    transportationCount: 0,
    nurseryContact: '',
    nurseryCount: 0,
    childrenContact: '',
    childrenCount: 0,
    youthContact: '',
    youthCount: 0,
    notes: '',
};

const EditGathering = ({
    // gathering: { gathering, servants, loading, newGathering },
    // auth: { activeClient, activeRole, activeStatus },
    //group: { groups, groupLoading },
    meeter: {active },
    meeting: { turnout, groups, meetingLoading},
    group: { tmpGroup},
    client: { defaultGroups, clientConfigs },
    // clientConfigs,
    createGathering,
    getMeeting,
    getGroups,
    clearTmpGroup,
    turnoffMeetingLoading,
    clearGroups,
    addDefaultGroups,
    getclientConfigs,
    match,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    
    useEffect(() => {
        // need to clear the redux meeting data
        clearTmpGroup();
    }, []);
    useEffect(() => {
        if (match.params.id !== "0"){
            if (!turnout) {
                getMeeting(match.params.id);
                // clearGroups();
                getGroups(match.params.id);
            }
            if(tmpGroup){
                clearTmpGroup();
            }
            if (!meetingLoading && match.params.id !== 0) {
                const gatheringData = { ...initialState };
                for (const key in turnout) {
                    if (key in gatheringData) gatheringData[key] = turnout[key];
                }
                setFormData(gatheringData);
            }

            if (meetingId) setFormData({ ...formData, meetingId: meetingId });
        }else{
            // this is new meeting
            setFormData(initialState);
            // there is no meeting to get, so need to flip meetingLoading to false
            turnoffMeetingLoading();
        }
    }, [turnout, tmpGroup, groups]);
    // }, [meetingLoading, turnout, active.client]);

    const {
        meetingId,
        clientId,
        meetingDate,
        facilitatorContact,
        meetingType,
        supportContact,
        title,
        worship,
        avContact,
        attendanceCount,
        newcomersCount,
        donations,
        meal,
        mealContact,
        mealCount,
        cafeContact,
        cafeCount,
        greeterContact1,
        greeterContact2,
        resourceContact,
        announcementsContact,
        closingContact,
        securityContact,
        setupContact,
        cleanupContact,
        transportationContact,
        transportationCount,
        nurseryContact,
        nurseryCount,
        childrenContact,
        childrenCount,
        youthContact,
        youthCount,
        notes,
    } = formData;

    const onChange = (e) => {
        if (e.target === 'phone') {
            console.log('phonephonephonephone');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData['meetingType'] === 'Testimony')
            delete formData['supportRole'];
        createGathering(formData, groups, history, active.client, true);
        window.scrollTo(0, 0);
    };

    const addDefaultGroupsToMeeting = () => { 
        addDefaultGroups(turnout.meetingId, defaultGroups, groups);
    };  
    
    return meetingLoading ? (
        <Spinner />
    ) : (
        // function inside(){
        //     console.log('inside');
        // }
        <Fragment>
            <h1 className='standard-font text-primary'>Your Meeting</h1>
            {/* <p className='lead'>
                <i className='fas fa-user' /> Have at it...
                <br />
            </p> */}
            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <h4>Meeting Date **</h4>
                    <input
                        className='mDate'
                        type='date'
                        id='meetingDate'
                        name='meetingDate'
                        value={meetingDate.slice(0, 10)}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                <h4>Facilitator</h4>
                <input
                    type='text'
                    className='x-large'
                    placeholder='Responsible party for meeting'
                    id='facilitatorContact'
                    name='facilitatorContact'
                    value={facilitatorContact}
                    onChange={onChange}
                />
                </div>
                <div className='form-group'>
                    <h4>Meeting Type **</h4>
                    <select
                        key='2'
                        name='meetingType'
                        value={meetingType}
                        onChange={(e) => onChange(e)}
                    >
                        <option key='0' value='0'>** Select the type of meeting</option>
                        <option key='1' value='Lesson'>Lesson</option>
                        <option key='2' value='Testimony'>Testimony</option>
                        <option key='3' value='Special'>Special</option>
                        <option key='4' value='Teaching'>Teaching</option>
                        <option key='5' value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        What kind of meeting is this?
                    </small>
                </div>
                <div className='form-group'>
                    {displayTitle()}
                    <input
                        type='text'
                        placeholder={diplayTitleHint()}
                        id='title'
                        name='title'
                        value={title ? title : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>{diplayTitleSubtitle()}</small>
                </div>
                {meetingType === 'Lesson' && (
                    <Fragment>
                        <input
                            type='text'
                            placeholder=''
                            id='supportContact'
                            name='supportContact'
                            value={supportContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Who is teaching the lesson?
                        </small>
                    </Fragment>
                )}
                {/* SHOW AVContact TEXTBOX IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['avContact'] === true ? (
                    <div className='form-group'>
                        <h4>Audio/Visual Contact</h4>
                        <input
                            type='text'
                            placeholder='who is doing tech?'
                            id='avContact'
                            name='avContact'
                            value={avContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Tech contact</small>
                    </div>
                ) : null}
                <div className='form-group'>
                    <h4>Worship</h4>
                    <input
                        type='text'
                        placeholder='Worship provided by...'
                        id='worship'
                        name='worship'
                        value={worship}
                        onChange={onChange}
                    />
                    <small className='form-text'>Worship supplied by...</small>
                </div>
                <div className='form-group'>
                    <h4>Attendance</h4>
                    <input
                        type='number'
                        id='attendanceCount'
                        name='attendanceCount'
                        value={attendanceCount}
                        min='0'
                        max='200'
                        onChange={(e) => onChange(e)}
                    />
                    <small className='form-text'>
                        Number of people attending general meeting?
                    </small>
                </div>
                <h4>Newcomers</h4>
                <input
                    type='number'
                    id='newcomersCount'
                    name='newcomersCount'
                    value={newcomersCount}
                    min='0'
                    max='200'
                    onChange={(e) => onChange(e)}
                />
                <small className='form-text'>Number of newcomers?</small>
                {/* SHOW DONATIONS IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['donations'] === true ? (
                    <div className='form-group'>
                        <h4>Donations</h4>
                        <input
                            type='number'
                            id='donations'
                            name='donations'
                            value={donations}
                            min='0.00'
                            step='0.01'
                            max='500'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Amount of donations received?
                        </small>
                    </div>
                ) : null}
                {/* SHOW MEAL DESCRIPTION IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['meal'] === true ? (
                    <div className='form-group'>
                        <h4>Meal</h4>
                        <input
                            type='text'
                            placeholder='Dinner plans...'
                            id='meal'
                            name='meal'
                            value={meal}
                            onChange={onChange}
                        />
                        <small className='form-text'>Dinner provided</small>
                    </div>
                ) : null}
                {/* SHOW MEAL COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['mealCoordinator'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='mealContact'
                            name='mealContact'
                            value={mealContact}
                            onChange={onChange}
                        />
                    </div>
                ) : null}
                {/* SHOW MEAL COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['mealCnt'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Count</h4>
                        <input
                            type='number'
                            id='mealCount'
                            name='mealCount'
                            value={mealCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of people served?
                        </small>
                    </div>
                ) : null}
                {/* SHOW CAFE COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['cafeCoordinator'] === true ? (
                    <div className='form-group'>
                        <h4>Cafe Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='cafeContact'
                            name='cafeContact'
                            value={cafeContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Cafe coordinator</small>
                    </div>
                ) : null}
                {/* SHOW CAFE COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['cafeCount'] === true ? (
                    <div className='form-group'>
                        <h4>Cafe Attendees</h4>
                        <input
                            type='number'
                            id='cafeCount'
                            name='cafeCount'
                            value={cafeCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of people served?
                        </small>
                    </div>
                ) : null}
                {/* SHOW GREETER 1 IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['greeterContact1'] === true ? (
                    <div className='form-group'>
                        <h4>Greeter</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='greeterContact1'
                            name='greeterContact1'
                            value={greeterContact1}
                            onChange={onChange}
                        />
                        <small className='form-text'>Greeter</small>
                    </div>
                ) : null}
                {/* SHOW GREETER 2 IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['greeterContact2'] === true ? (
                    <div className='form-group'>
                        <h4>Greeter</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='greeterContact2'
                            name='greeterContact2'
                            value={greeterContact2}
                            onChange={onChange}
                        />
                        <small className='form-text'>Greeter</small>
                    </div>
                ) : null}
                {/* SHOW RESOURCES CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['resourceContact'] === true ? (
                    <div className='form-group'>
                        <h4>Resources Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='resourceContact'
                            name='resourceContact'
                            value={resourceContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Resources Contact</small>
                    </div>
                ) : null}
                {/* SHOW ANNOUNCEMENTS CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['announcementsContact'] === true ? (
                    <div className='form-group'>
                        <h4>Announcements Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='announcementsContact'
                            name='announcementsContact'
                            value={announcementsContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Announcements Contact
                        </small>
                    </div>
                ) : null}
                {/* SHOW CLOSING CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['closingContact'] === true ? (
                    <div className='form-group'>
                        <h4>Closing Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='closingContact'
                            name='closingContact'
                            value={closingContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Closing Contact</small>
                    </div>
                ) : null}
                {/* SHOW SECURITY IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['securityContact'] === true ? (
                    <div className='form-group'>
                        <h4>Security Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='securityContact'
                            name='securityContact'
                            value={securityContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Security point of contact
                        </small>
                    </div>
                ) : null}
                <hr className='group-ruler' />
                {/* SHOW NURSERY COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['nurseryContact'] === true ? (
                    <div className='form-group'>
                        <h4>Nursery Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='nurseryContact'
                            name='nurseryContact'
                            value={nurseryContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Nursery Contact</small>
                    </div>
                ) : null}
                {/* SHOW NURSERY COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['nursery'] === true ? (
                    <div className='form-group'>
                        <h4>Nursery Count</h4>
                        <input
                            type='number'
                            id='nurseryCount'
                            name='nurseryCount'
                            value={nurseryCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of kids in nursery?
                        </small>
                    </div>
                ) : null}
                {/* SHOW CHILDREN COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['childrenContact'] === true ? (
                    <div className='form-group'>
                        <h4>Childern Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='childrenContact'
                            name='childrenContact'
                            value={childrenContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Children Contact</small>
                    </div>
                ) : null}
                {/* SHOW CHILDREN COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['children'] === true ? (
                    <div className='form-group'>
                        <h4>Children Count</h4>
                        <input
                            type='number'
                            id='childrenCount'
                            name='childrenCount'
                            value={childrenCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of kids in childcare?
                        </small>
                    </div>
                ) : null}
                {/* SHOW YOUTH COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['youthContact'] === true ? (
                    <div className='form-group'>
                        <h4>Youth Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='youthContact'
                            name='youthContact'
                            value={youthContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Youth Contact</small>
                    </div>
                ) : null}
                {/* SHOW YOUTH COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['youth'] === true ? (
                    <div className='form-group'>
                        <h4>Youth Count</h4>
                        <input
                            type='number'
                            id='youthCount'
                            name='youthCount'
                            value={youthCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of kids in youth?
                        </small>
                    </div>
                ) : null}
                {/* SHOW SETUP IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['setupContact'] === true ? (
                    <div className='form-group'>
                        <h4>Setup Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='setupContact'
                            name='setupContact'
                            value={setupContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Setup Coordinator</small>
                    </div>
                ) : null}
                {/* SHOW CLEANUP IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['cleanupContact'] === true ? (
                    <div className='form-group'>
                        <h4>Clean-up Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='cleanupContact'
                            name='cleanupContact'
                            value={cleanupContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Clean-up point of contact
                        </small>
                    </div>
                ) : null}
                {/* SHOW TRANSPORTATION IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['transportationContact'] === true ? (
                    <div className='form-group'>
                        <h4>Transportation Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='transportationContact'
                            name='transportationContact'
                            value={transportationContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Transportation</small>
                    </div>
                ) : null}
                {/* SHOW YOUTH COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {clientConfigs['transportationCount'] === true ? (
                    <div className='form-group'>
                        <h4>Transportation Guests</h4>
                        <input
                            type='number'
                            id='transportationCount'
                            name='transportationCount'
                            value={transportationCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of people using transporation service?
                        </small>
                    </div>
                ) : null}

                <div className='form-group'>
                    <div className='form-group'>
                        <h4>Notes</h4>
                        <textarea
                            placeholder='Description and notes for meeting'
                            id='notes'
                            name='notes'
                            value={notes}
                            onChange={(e) => onChange(e)}
                        ></textarea>
                    </div>
                </div>
                
                <input type='submit' className='btn btn-primary my-1' />
                {active.status === 'approved' &&
                active.role !== 'guest' &&
                meetingId ? (
                    <Fragment>
                        <hr className='group-ruler my-1' />
                        <h2>Open-Share Groups</h2>
                        <div>
                            <Link to={`/EditGroup/0`}>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                // className={classes.button}
                                startIcon={<PlaylistAddIcon />}
                                // href={`/EditGroup/0`}
                            >
                                New Group
                            </Button>
                            </Link>
                            <Button
                                        variant='contained'
                                        color='default'
                                        size='small'
                                        startIcon={<PlaylistAddIcon />}
                                        onClick={() => addDefaultGroupsToMeeting()}
                                    >
                                        DEFAULTS
                                    </Button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <hr className='group-ruler my-1' />
                        <div>
                            <h3>Open-share Groups</h3>
                        </div>
                    </Fragment>
                )}
            </form>
            <div>
                {groups &&
                    groups.map((group) => (
                        <GatheringGroupListItem key={group.groupId} group={group}/>
                        
                    ))
                }
            </div>
        </Fragment>
    );
    
    function displayTitle() {
        switch (meetingType) {
            case 'Lesson':
                return <h4>Lesson</h4>;

            case 'Testimony':
                return <h4>Who's Testimony?</h4>;

            default:
                return <h4>Description</h4>;
        }
    }

    function diplayTitleHint() {
        switch (meetingType) {
            case 'Lesson':
                return 'What is the lesson?';

            case 'Testimony':
                return "Who's testimony?";

            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleSubtitle() {
        switch (meetingType) {
            case 'Lesson':
                return 'Which lesson is being given?';

            case 'Testimony':
                return "Who's testimony is being shared?";

            default:
                return 'Please provide a description of the event';
        }
    }

};

EditGathering.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getMeeting: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    clearGroups: PropTypes.func.isRequired,
    clearTmpGroup: PropTypes.func.isRequired,
    getclientConfigs: PropTypes.func.isRequired,
    turnoffMeetingLoading: PropTypes.func.isRequired,
    getDefGroups: PropTypes.func.isRequired,
    addDefaultGroups: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
    meeting: PropTypes.object.isRequired,
    // clientConfigs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    gathering: state.gathering,
    servants: state.servants,
    client: state.client,
    group: state.group,
    auth: state.auth,
    meeter: state.meeter,
    meeting: state.meeting,
    // clientConfigs: state.meeter.clientConfigs,
});

export default connect(mapStateToProps, {
    createGathering,
    getMeeting,
    getGroups,
    clearGroups,
    clearTmpGroup,
    getMtgConfigs,
    getDefGroups,
    addDefaultGroups,
    deleteGroup,
    turnoffMeetingLoading,
})(withRouter(EditGathering));
