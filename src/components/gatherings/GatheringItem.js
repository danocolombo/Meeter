import React from 'react';
import { Link } from 'react-router-dom';
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
        <div className='gather-component__header-row'>
            <div className='gather-component__date'>{meetingDate}</div>
            <div className='gather-component__trash-style'><i
                    className={'fa fa-trash my'}
                    onClick={() => deleteGathering(meetingId, presentView)}
                ></i>
            </div>
        </div>
        <div className='gather-component__second-row'>
            <div className="gather-component__type-style">{meetingType}</div>
            <div className='gather-component__title-style'>
                {title}
            </div>
            <br />
            <div className='gather-component__edit-style'>
                <Link to={`/EditGathering/${meetingId}`}>
                    <i className='fas fa-pen'></i>
                </Link>
            </div>
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
