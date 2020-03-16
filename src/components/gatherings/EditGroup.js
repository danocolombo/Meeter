import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteGroup, createGroup } from '../../actions/gathering';

const EditGroup = ({ deleteGroup, createGroup }) => {
    return (
        <>
            <Fragment>
                <div className='group-container'>
                    <header class='grpHeader'>
                        <h1>Open Share Groups</h1>
                    </header>
                    <div className='Title'>Title</div>
                    <div className='navButtons'>Buttons here</div>
                    <div className='grpCntRadios'>
                        This is where the attendance and M/F radios go..
                    </div>
                    <div className='grpLocation'>Location</div>
                    <div className='grpLocSpace' />
                    <div className='grpFacilitator'>Facilitator</div>
                    <div className='grpFacSpace'></div>
                    <div className='grpCoFaciliator'>Co-Facilitator</div>
                    <div className='grpCoFacSpace'></div>
                    <div className='grpNotes'>NOTEs</div>
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

export default connect(null, { deleteGroup, createGroup })(EditGroup);
