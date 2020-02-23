import React, { Fragment, Profiler } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGathering } from '../../actions/gathering';

const GatheringItem = ({
    deleteGathering,
    gathering: { _id, meetingDate, title, facilitator, meetingType }
}) => (
    <Fragment>
        <div className='PersonBox'>
            <div className='DeleteTarget'>
                <a
                    id='deleteGathering'
                    title='-'
                    href='/#'
                    onClick={() => deleteGathering(_id)}
                >
                    <i className='fas fa-minus-circle'></i>
                </a>
            </div>
            <div>
                <Link to={`/EditGathering/${_id}`}>
                    {moment.utc(meetingDate).format('ll')}
                </Link>
                <br />
                {meetingType}: {title}
                <br />
                facilitator: {facilitator}
                <br />
                <i className='fas fa-pen'></i>
            </div>
        </div>
    </Fragment>
);

GatheringItem.propTypes = {
    gathering: PropTypes.object.isRequired,
    deleteGathering: PropTypes.func.isRequired
};

export default connect(null, { deleteGathering })(GatheringItem);
//post bg-white p-1 my-1
