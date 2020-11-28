import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { Button } from '@material-ui/core';
import {
    createGathering,
    getGathering,
    addDefaultGroups,
} from '../../actions/gathering';
import { getGroups, deleteGroup } from '../../actions/group';
import GroupListItem from './GroupListItem';
import { getMtgConfigs, getDefGroups } from '../../actions/admin';
// import ServantSelect from './ServantSelect';
// import GroupList from './GroupList';
import Spinner from '../layout/Spinner';

const initialState = {
    id: '',
    clientId: '',
    meetingId: '',
    meetingDate: '',
    facilitator: '',
    meetingType: '',
    supportRole: '',
    title: '',
    worship: '',
    avContact: '',
    attendance: 0,
    newcomers: 0,
    donations: 0,
    meal: '',
    mealCoordinator: 'TBD',
    mealCnt: 0,
    cafeCoordinator: 'TBD',
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
    nursery: 0,
    childrenContact: '',
    children: 0,
    youthContact: '',
    youth: 0,
    notes: '',
};

const EditGathering = ({
    gathering: { gathering, servants, loading, newGathering },
    auth,
    meeting: { meeting, groups },
    meeter,
    createGathering,
    getGathering,
    getGroups,
    addDefaultGroups,
    match,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        getGathering(match.params.id, meeter.active.client);
        getGroups(match.params.id);

    }, [getGathering, getGroups]);
    useEffect(() => {
        const gatheringData = { ...initialState };
        for (const key in gathering) {
            if (key in gatheringData) gatheringData[key] = gathering[key];
        }
        setFormData(gatheringData);
    }, [gathering]);
    // useEffect(() => {
    //     getGroups(match.params.id);

    //     getMtgConfigs(meeter.active.client);
    //     getDefGroups(meeter.active.client);
    //     // console.log('just ran getGroups');
    // }, [meeter.active.client, getGroups, getMtgConfigs, match.params.id]);
    // useEffect(() => {
    //     if (!gathering && match.params.id !== '0') {
    //         getGathering(match.params.id);
    //         // getGroups(match.params.id);
    //     }
    //     if (!loading) {
    //         const gatheringData = { ...initialState };
    //         for (const key in gathering) {
    //             if (key in gatheringData) gatheringData[key] = gathering[key];
    //         }
    //         setFormData(gatheringData);
    //     }

    //     if (id) setFormData({ ...formData, meetingId: id });
    // }, [loading, gathering, auth.user.activeClient]);

    const {
        id,
        clientId,
        meetingId,
        meetingDate,
        facilitator,
        meetingType,
        supportRole,
        title,
        worship,
        avContact,
        attendance,
        newcomers,
        donations,
        meal,
        mealCoordinator,
        mealCnt,
        cafeCoordinator,
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
        nursery,
        childrenContact,
        children,
        youthContact,
        youth,
        notes,
    } = formData;

    const onChange = (e) => {
        if (e.target === 'phone') {
            console.log('phonephonephonephone');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onServantChange = (servantSelected) => {
        //we are assuming Facilitator
        setFormData({ ...formData, [facilitator]: servantSelected });
        console.log('back from servantSelect. value: ' + servantSelected);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (formData['meetingType'] === 'Testimony')
            delete formData['supportRole'];
        createGathering(formData, history, meeter.active.client, true);
        window.scrollTo(0, 0);
    };
    const handleGroupDeleteRequest = (gid) => {
        //this is going to delete the selected request
        //and update the groups for the meeting
        console.log('back in EditGathering');
        deleteGroup(gid, meetingId);
    };

    const addDefaultGroupsToMeeting = () => {
        console.log('in EditGatherings :: addDefaultGroupsToMeeting');
        // addDefaultGroups(meeter.defaultGroups);
        // console.log(
        //     'defaultGroups: ' +
        //         util.inspect(meeter.defaultGroups, { showHidden: false, depth: null })
        // );
        //============================================
        // this is sample of 3 default meetings in REDUX
        // defaultGroups: [
        //     { id: '5efe35a12f948b40189671a6',
        //         gender: 'f',
        //         title: 'A-Z',
        //         location: 'Library',
        //         facilitator: 'Marie'
        //     },
        //     { id: '5efe3dbb22c44e40f9775e06',
        //         gender: 'm',
        //         title: 'chem',
        //         location: 'Library',
        //         facilitator: 'Dale'
        //     },
        //     { id: '5efe43400e4232414c2ee7e4',
        //         gender: 'x',
        //         title: 'remove me',
        //         location: 'bathroom',
        //         facilitator: 'Waldo'
        //     }
        // ]

        let dgroups = meeter.defaultGroups;
        let groupsToAdd = [];
        // let newBatch = [];
        dgroups.map((g) => {
            let aGroup = {};
            aGroup.id = g.id;
            aGroup.clientId = meeter.active.client;
            aGroup.meetingId = match.params.id;
            aGroup.gender = g.gender;
            aGroup.title = g.title;
            if (g.location) aGroup.location = g.location;
            if (g.facilitator) aGroup.facilitator = g.facilitator;
            groupsToAdd.push(aGroup);
        });
        addDefaultGroups(groupsToAdd);
        // newGroup.push({
        //     mid: match.params.id,
        //     gender: g.gender,
        //     title: g.title,

        //     location: g.location,
        //     facilitator: g.facilitator,
        // });
        // console.log(JSON.stringify(newGroup));
        // newBatch.push({
        //     newGroup,
        // });
        //     console.log('newBatch...');
        //     console.log(JSON.stringify(newBatch));
        //     // console.log('id: ' + g.id);
        //     // console.log('gender: ' + g.gender);
        //     // console.log('title: ' + g.title);
        //     // console.log('location: ' + g.location);
        //     // console.log('faciliator: ' + g.facilitator);
        // });
    };
    // // DANO
    // console.log('donations: ' + meeter.mtgConfigs['donations']);
    // console.log('type of mtgConfigs: ' + typeof meeter.mtgConfigs);
    // console.table(meeter.mtgConfigs);
    const util = require('util');
    console.log(
        'meeter.mtgConfigs: ' +
            util.inspect(meeter.mtgConfigs, { showHidden: false, depth: null })
    );
    return loading ? (
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
                <h4>Facilitator</h4>
                <input
                    type='text'
                    class='x-large'
                    placeholder='Responsible party for meeting'
                    id='facilitator'
                    name='facilitator'
                    value={facilitator}
                    onChange={onChange}
                />
                {/* <select
                    value={facilitator}
                    name='facilitator'
                    onChange={onChange}
                >
                    {servants.map((s) => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select> */}
                <div className='form-group'>
                    <h4>Meeting Type **</h4>
                    <select
                        key='2'
                        name='meetingType'
                        value={meetingType}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='0'>** Select the type of meeting</option>
                        <option value='Lesson'>Lesson</option>
                        <option value='Testimony'>Testimony</option>
                        <option value='Special'>Special</option>
                        <option value='Teaching'>Teaching</option>
                        <option value='Other'>Other</option>
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
                            id='supportRole'
                            name='supportRole'
                            value={supportRole}
                            onChange={onChange}
                        />

                        {/* <select
                            value={supportRole}
                            name='supportRole'
                            onChange={onChange}
                        >
                            {servants.map((s) => (
                                <option key={s.name} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select> */}
                        <small className='form-text'>
                            Who is teaching the lesson?
                        </small>
                    </Fragment>
                )}
                {/* SHOW AVContact TEXTBOX IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {meeter.mtgConfigs['avContact'] === true ? (
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
                        id='attendance'
                        name='attendance'
                        value={attendance}
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
                    id='newcomers'
                    name='newcomers'
                    value={newcomers}
                    min='0'
                    max='200'
                    onChange={(e) => onChange(e)}
                />
                <small className='form-text'>Number of newcomers?</small>
                {/* SHOW DONATIONS IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {meeter.mtgConfigs['donations'] === true ? (
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
                {meeter.mtgConfigs['meal'] === true ? (
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
                {meeter.mtgConfigs['mealCoordinator'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='mealCoordinator'
                            name='mealCoordinator'
                            value={mealCoordinator}
                            onChange={onChange}
                        />
                    </div>
                ) : null}
                {/* SHOW MEAL COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {meeter.mtgConfigs['mealCnt'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Count</h4>
                        <input
                            type='number'
                            id='mealCnt'
                            name='mealCnt'
                            value={mealCnt}
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
                {meeter.mtgConfigs['cafeCoordinator'] === true ? (
                    <div className='form-group'>
                        <h4>Cafe Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            id='cafeCoordinator'
                            name='cafeCoordinator'
                            value={cafeCoordinator}
                            onChange={onChange}
                        />
                        <small className='form-text'>Cafe coordinator</small>
                    </div>
                ) : null}
                {/* SHOW CAFE COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {meeter.mtgConfigs['cafeCount'] === true ? (
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
                {meeter.mtgConfigs['greeterContact1'] === true ? (
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
                {meeter.mtgConfigs['greeterContact2'] === true ? (
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
                {meeter.mtgConfigs['resourceContact'] === true ? (
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
                {meeter.mtgConfigs['announcementsContact'] === true ? (
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
                {meeter.mtgConfigs['closingContact'] === true ? (
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
                {meeter.mtgConfigs['securityContact'] === true ? (
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
                {meeter.mtgConfigs['nurseryContact'] === true ? (
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
                {meeter.mtgConfigs['nursery'] === true ? (
                    <div className='form-group'>
                        <h4>Nursery Count</h4>
                        <input
                            type='number'
                            id='nursery'
                            name='nursery'
                            value={nursery}
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
                {meeter.mtgConfigs['childrenContact'] === true ? (
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
                {meeter.mtgConfigs['children'] === true ? (
                    <div className='form-group'>
                        <h4>Children Count</h4>
                        <input
                            type='number'
                            id='children'
                            name='children'
                            value={children}
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
                {meeter.mtgConfigs['youthContact'] === true ? (
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
                {meeter.mtgConfigs['youth'] === true ? (
                    <div className='form-group'>
                        <h4>Youth Count</h4>
                        <input
                            type='number'
                            id='youth'
                            name='youth'
                            value={youth}
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
                {meeter.mtgConfigs['setupContact'] === true ? (
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
                {meeter.mtgConfigs['cleanupContact'] === true ? (
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
                {meeter.mtgConfigs['transportationContact'] === true ? (
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
                {meeter.mtgConfigs['transportationCount'] === true ? (
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
                {FormButtons(meetingDate)}

                {meeter.active.status === 'approved' &&
                meeter.active.role !== 'guest' &&
                id ? (
                    <Fragment>
                        <hr className='group-ruler my-1' />
                        <h2>Open-Share Groups</h2>
                        <span className={'pl-2 my'}>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                // className={classes.button}
                                startIcon={<PlaylistAddIcon />}
                                href={`/EditGroup/${id}/0`}
                            >
                                New Group
                            </Button>
                        </span>
                        <span className={'pl-2'}>
                            {meeter.defaultGroups &&
                            meeter.defaultGroups.length > 0 &&
                            auth.user.activeRole !== 'guest' ? (
                                <span>
                                    <Button
                                        variant='contained'
                                        color='default'
                                        size='small'
                                        startIcon={<PlaylistAddIcon />}
                                        onClick={addDefaultGroupsToMeeting}
                                    >
                                        DEFAULTS
                                    </Button>
                                </span>
                            ) : auth.user.activeRole === 'owner' ||
                              auth.user.activeRole === 'superuser' ? (
                                <span>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='small'
                                        // className={classes.button}
                                        startIcon={<SettingsIcon />}
                                        href='/DisplaySecurity'
                                    >
                                        CONFIGURE
                                    </Button>
                                </span>
                            ) : null}
                            {id.length < 1 ? (
                                <div>
                                    Open-share groups can be added after the
                                    meeting is saved.
                                </div>
                            ) : null}
                        </span>
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
            <div style={{ 'padding-top': 10 }}>
                {groups &&
                    groups.map((group) => (
                        <GroupListItem
                            key={group.id}
                            group={group}
                            role={auth.user.activeRole}
                            deleteGroup={handleGroupDeleteRequest}
                        />
                    ))}
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
    function FormButtons(meetingDate) {
        var returnValue = [];
        // var today = new Date();
        // today.setHours(0, 0, 0, 0);
        // var mDate = new Date(meetingDate.slice(0, 10));
        // // console.log('mDate:' + mDate);
        // // console.log('today:' + today);
        // need to create special date for today starting at T00:00:00.000Z
        let mDate = new Date(meetingDate.slice(0, 10));
        let tDate = new Date();
        let numMonth = tDate.getMonth() + 1;
        let tmpMonth = numMonth.toString();
        let tmpDay = tDate.getDate().toString();
        let tMonth = '';
        let tDay = '';
        if (tmpMonth.length < 2) {
            tMonth = '0' + tmpMonth;
        } else {
            tMonth = tmpMonth;
        }
        if (tmpDay.length < 2) {
            tDay = '0' + tmpDay;
        } else {
            tDay = tmpDay;
        }
        let tYear = tDate.getFullYear();
        let target = tYear + '-' + tMonth + '-' + tDay + 'T00:00:00.000Z';

        if (meetingDate >= target) {
            console.log('greater than or equal');
            if (
                meeter.active.status === 'approved' &&
                meeter.active.role !== 'guest'
            ) {
                returnValue = [
                    <>
                        <input type='submit' className='btn btn-primary my-1' />
                        <Button className='btn-light' href='/gatherings'>
                            Go Back
                        </Button>
                        {/* <Link className='btn btn-light my-1' to='/gatherings'>
                            Go Back
                        </Link> */}
                    </>,
                ];
            } else {
                returnValue = [
                    <>
                        <Button
                            className='btn-light'
                            href='/gatherings'
                            variant='outlined'
                        >
                            Go Back
                        </Button>
                        {/* <Link className='btn btn-light my-1' to='/gatherings'>
                            Go Back
                        </Link> */}
                    </>,
                ];
            }
        } else {
            returnValue = [
                <>
                    <input type='submit' className='btn btn-primary my-1' />
                    <Button
                        className='btn-light'
                        href='/gatherings/historyView'
                    >
                        Go Back
                    </Button>
                </>,
            ];
        }
        return [
            <>
                <table>{returnValue}</table>
            </>,
        ];
    }

    // function displayTeacher() {
    //     if (meetingType === 'Lesson') {
    //         return [
    //             <h4>Teacher</h4>,
    //             <input
    //                 type='text'
    //                 placeholder='teacher...'
    //                 name='title'
    //                 value={supportRole}
    //                 onChange={onChange}
    //             />,
    //             <small className='form-text'>Who taught the lesson?</small>,
    //         ];
    //     }
    //     return null;
    // }
    // function displayFacilitator() {
    //     {
    //         console.log(servants.length);
    //         var peeps = '';
    //         servants.forEach((peep) => {
    //             peeps = peeps + peep;
    //         });
    //         const sample =
    //             "<option value='Junior Developer'>Junior Developer</option>";
    //         console.log(peeps);
    //         return [
    //             <div className='form-group'>
    //                 ,
    //                 <select name='status' value='{status}' onChange={onChange}>
    //                     ,<option>* Select Professional Status</option>,{sample},
    //                 </select>
    //                 ,
    //                 <small className='form-text'>
    //                     , 'Give us an idea of where you are at in your career',
    //                 </small>
    //                 ,
    //             </div>,
    //         ];
    //     }
    // }
};

EditGathering.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getGathering: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    addDefaultGroups: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    meeting: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
    mtgConfigs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    gathering: state.gathering,
    servants: state.servants,
    meeting: state.meeting,
    auth: state.auth,
    meeter: state.meeter,
    mtgConfigs: state.meeter.mtgConfigs,
});

export default connect(mapStateToProps, {
    createGathering,
    getGathering,
    getGroups,
    addDefaultGroups,
    deleteGroup,
})(withRouter(EditGathering));
