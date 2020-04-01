import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { FormLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Slider } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteGroup, createGroup, getGroup } from '../../actions/group';

const initialState = {
    id: '',
    title: '',
    attendance: '0',
    gender: '',
    location: '',
    facilitator: '',
    cofacilitator: '',
    notes: ''
};

const EditGroup = ({
    gathering: { gathering, servants, loading },
    match,
    createGroup,
    deleteGroup,
    getGroup
}) => {
    // (match.params.MID)?console.log(match.params.MID):console.log('no MID');
    var MID = '';
    var GID = '';
    const [formData, setFormData] = useState(initialState);
    // const [selectedValue, setSelectedValue] = React.useState('a');
    // const handleRadioChange = event => {
    //     setSelectedValue(event.target.value);
    // };
    const handleSlide = (event, newValue) => {
        //setValue(newValue);
    };
    useEffect(() => {
        MID = match.params.mid;
        GID = match.params.gid;
        // console.log('meeting id: ' + match.params.mid);
        // if (!group) {
        //     //call getGroup;
        // }
        // if (!loading) {
        //     const gatheringData = { ...initialState };
        //     for (const key in gathering) {
        //         if (key in gatheringData) gatheringData[key] = gathering[key];
        //     }
        //     setFormData(gatheringData);
        // }
        gathering ? console.log('gathered') : console.log('ungathered');
        MID ? console.log('MID ' + MID) : console.log('MID not set');
        GID ? console.log('GID ' + GID) : console.log('GID not set');
    }, [gathering, loading]);

    return (
        <>
            <Fragment>
                <div className='group-container'>
                    <header className='grpHeader'>
                        <h2>Open Share Group</h2>
                    </header>
                    <div>Meeting:{MID}<br/>Group: {GID}</div>
                    {/* <div>Group: {GID}</div> */}
                    <div className='input-field'>
                        <div className='grpTitle'>
                            <TextField
                                id='title'
                                value=''
                                label='Group title'
                                variant='outlined'
                                fullWidth='true'
                            />
                        </div>
                    </div>
                    <div className='navButtons'>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            className='pl10 py-2'
                        >
                            Save
                        </Button>
                        {'      '}
                        {/* ================== */}
                        <Link className='btn btn-light my-1' to={`/editGatherings/${MID}`}>
                            Go Back
                        </Link>
                        {/* ================== */}
                        {/* <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            className='py-2'
                        >
                            Go Back
                        </Button> */}
                    </div>

                    <div className='grpAttendance'>
                        <div class='input-field inline'>
                            {/* <Slider
                                value={attendance}
                                onChange={handleSlide}
                                aria-labelledby='continuous-slider'
                            /> */}
                            {/* <Input
                                id='attendance'
                                label='attendance'
                                type='number'
                                text-align='right'
                                defaultValue='0'
                                className='attendance'
                            />
                            <label for='grpAttendance'>Attendance</label> */}
                        </div>
                    </div>
                    <div className='grpRadios'>
                        <Radio
                            id='gender'
                            // checked={selectedValue === 'f'}
                            // onChange={handleRadioChange}
                            value='f'
                            label='Women'
                            name='radio-button-demo'
                            inputProps={{ 'aria-label': 'f' }}
                        />{' '}
                        Women
                        <Radio
                            id='gender'
                            // checked={selectedValue === 'm'}
                            // onChange={handleRadioChange}
                            value='m'
                            name='radio-button-demo'
                            inputProps={{ 'aria-label': 'm' }}
                        />{' '}
                        Men
                        <Radio
                            id='gender'
                            // checked={selectedValue === 'x'}
                            // onChange={handleRadioChange}
                            value='x'
                            label='Mixed'
                            name='radio-button-demo'
                            inputProps={{ 'aria-label': 'x' }}
                        />{' '}
                        Mixed
                    </div>
                    <div className='grpLocation'>
                        <TextField
                            id='location'
                            label='Location'
                            variant='outlined'
                            fullWidth='true'
                        />
                    </div>
                    <div className='grpSpace' />
                    <div className='grpFacilitator'>
                        <TextField
                            id='facilitator'
                            label='Facilitator'
                            variant='outlined'
                            fullWidth='true'
                        />
                    </div>
                    <div className='grpSpace'></div>
                    <div className='grpCoFacilitator'>
                        <TextField
                            id='cofacilitator'
                            label='Co-Facilitator'
                            variant='outlined'
                            fullWidth='true'
                        />
                    </div>
                    <div className='grpSpace'></div>
                    <div className='grpNotes'>
                        <TextField
                            id='notes'
                            label='Notes'
                            multiline
                            rows='2'
                            defaultValue=''
                            fullWidth='true'
                            variant='outlined'
                        />
                    </div>
                </div>
            </Fragment>
        </>
    );
};

EditGroup.propTypes = {
    // groups: PropTypes.array.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    gathering: state.gathering,
    servants: state.servants
});

export default connect(mapStateToProps, { deleteGroup, createGroup })(
    EditGroup
);
