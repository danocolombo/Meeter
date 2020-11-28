import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Input } from '@material-ui/core';

import { addGroup, getGroup, deleteGroup } from '../../actions/group';
const initialState = {
    id: '',
    title: '',
    meetingId: 0,
    gender: 'x',
    location: '',
    facilitator: '',
    cofacilitator: '',
    attendance: 0,
    notes: '',
};

const EditGroup = ({ group, role, deleteGroup, history }) => {
    const [formData, setFormData] = useState(initialState);
    // useEffect(() => {
    //     if (match.params.iid !== 0) {
    //         getGroup(match.params.gid);
    //         setFormData({ ...formData, id: match.params.gid });
    //         setFormData({ ...formData, meetingId: match.params.mid });
    //         const groupData = { ...initialState };
    //         for (const key in group) {
    //             if (key in groupData) groupData[key] = group[key];
    //         }
    //         groupData['meetingId'] = match.params.mid;
    //         setFormData(groupData);
    //         setFormData({ ...formData, id: match.params.gid });
    //     }
    // }, []);
    // useEffect(() => {
    //     if (!group) {
    //         if (match.params.gid != 0) {
    //             getGroup(match.params.gid);
    //         }
    //     }
    //     if (!loading) {
    //         const groupData = { ...initialState };
    //         for (const key in group) {
    //             if (key in groupData) groupData[key] = group[key];
    //         }
    //         groupData['mid'] = match.params.mid;
    //         setFormData(groupData);
    //     }
    //     if (match.params.gid > 0)
    //         setFormData({ ...formData, groupId: match.params.gid });
    // }, [loading, getGroup, group]);

    const {
        id,
        title,
        meetingId,
        gender,
        location,
        facilitator,
        cofacilitator,
        attendance,
        notes,
    } = formData;

    const handleGenderChange = (e) => {
        console.log('btnValue:' + e.target.value);
        setFormData({ ...formData, gender: e.target.value });
    };
    const handleChange = (event) => {
        console.log('event:' + event);
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        formData.meetingId = group.meetingId;
        addGroup(formData, history, true);
        window.scrollTo(0, 0);
    };
    return (
        <div>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <header className='grpHeader'>
                    <h2>Open Share Group</h2>
                </header>
                <div>
                    <select
                        key='2'
                        // className=''
                        name='gender'
                        value={group.gender}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='0'>** Select Gender</option>
                        <option value='f'>Women's</option>
                        <option value='m'>Men's</option>
                        <option value='x'>Mixed</option>
                    </select>
                </div>
                <div>
                    <span>Attendance</span>
                    <span style={{ 'padding-left': 20 }}>
                        <Input
                            // style={{ 'padding-left': 20 }}
                            id='attendance'
                            label='attendance'
                            name='attendance'
                            placeholder='0'
                            value={group.attendance}
                            type='number'
                            size='3'
                            maxlength='2'
                            min='0'
                            text-align='right'
                            // className='attendance'
                            onChange={(e) => onChange(e)}
                        />
                    </span>
                </div>
                <div className='grpTitle'>
                    <TextField
                        id='title'
                        name='title'
                        label='Group title'
                        // variant='outlined'
                        fullWidth
                        value={group.title}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='grpLocation'>
                    <TextField
                        id='location'
                        label='Location'
                        name='location'
                        fullWidth
                        value={group.location}
                        // variant='outlined'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='grpFacilitator'>
                    <TextField
                        id='facilitator'
                        label='Facilitator'
                        name='facilitator'
                        value={group.facilitator}
                        fullWidth
                        // variant='outlined'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='grpCoFacilitator'>
                    <TextField
                        id='cofacilitator'
                        name='cofacilitator'
                        value={group.cofacilitator}
                        fullWidth
                        label='Co-Facilitator'
                        // variant='outlined'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='grpNotes'>
                    <TextField
                        id='notes'
                        name='notes'
                        value={group.notes}
                        label='Notes'
                        fullWidth
                        multiline
                        rows='4'
                        // variant='outlined'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='pl-2' style={{ 'padding-top': 20 }}>
                    <input type='submit' className='btn btn-primary my-1' />

                    <span className='pl-2'>
                        <Link
                            className='btn btn-light my-1'
                            to={`/editGathering/${group.meetingId}`}
                        >
                            Go Back
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

EditGroup.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    group: state.group,
    auth: state.auth,
});

export default connect(mapStateToProps, { addGroup, getGroup, deleteGroup })(
    withRouter(EditGroup)
);
