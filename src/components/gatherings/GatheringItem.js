import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGathering } from '../../actions/gathering';

const GatheringItem = ({
    deleteGathering,
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
}) => (
    <Fragment>
        <div className={meetingType !== 'Other' ? 'PersonBox' : 'OtherBox'}>
            <Fragment>
                <div className='DeleteTarget'>
                    <a
                        id='deleteGathering'
                        title='-'
                        href='/#'
                        onClick={() => deleteGathering(meetingId)}
                    >
                        <i className='fas fa-minus-circle'></i>
                    </a>
                </div>
            </Fragment>
            <div>
                <Link to={`/EditGathering/${meetingId}`}>
                    {moment.utc(meetingDate).format('ll')}
                </Link>
                <br />
                {meetingType}: {title}
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
    </Fragment>
);

GatheringItem.propTypes = {
    gathering: PropTypes.object.isRequired,
    deleteGathering: PropTypes.func.isRequired,
};

export default connect(null, { deleteGathering })(GatheringItem);
//post bg-white p-1 my-1
