import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGathering } from '../../actions/gathering';
import './gathering.styles.scss';
const GatheringItem = ({
    
    gathering: {
        meetingId,
        meetingDate,
        title,
        supportContact,
        facilitatorContact,
        attendanceCount,
        newcomersCount,
        meetingType,
        
    },
    deleteGathering,
    presentView,
}) => (
        <div className="gather-component__wrapper">
            <div className='gather-component__delete-row'>
                <div className='gather-component__test-style'><i
                        className={'fa fa-trash my'}
                        onClick={() => deleteGathering(meetingId, presentView)}
                    ></i>
                </div>
            </div>
            <div className="gather-component__gathering-info-box">
                
                    <div className="gather-component__type-testimony">{meetingType}:</div> {title}
                
                {supportContact && (
                    <Fragment>
                        <br />
                        {supportContact}
                    </Fragment>
                )}
                {attendanceCount > 0 && (
                    <Fragment>
                        <br />
                        Attendance: {attendanceCount}
                    </Fragment>
                )}
                {newcomersCount > 0 && (
                    <Fragment>
                        <br />
                        Newcomers: {newcomersCount}
                    </Fragment>
                )}
                <br />
                <Link to={`/EditGathering/${meetingId}`}>
                    <i className='fas fa-pen'></i>
                </Link>
            </div>
            </div>
);

GatheringItem.propTypes = {
    gathering: PropTypes.object.isRequired,
    presentView: PropTypes.bool.isRequired,
    deleteGathering: PropTypes.func.isRequired,
};

export default connect(null, { deleteGathering })(GatheringItem);
//post bg-white p-1 my-1
