import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGathering } from '../../actions/gathering';

const GatheringItem = ({
  deleteGathering, gathering: { _id, meetingTitle, facilitator, meetingType }
}) => (
  <div className="PersonBox">
    <div className="DeleteTarget">
      <button
        onClick={() => deleteGathering(_id)}
        type='button'
        className='btn btn-danger'>
        <i className='fas fa-trash' />
      </button>
    </div>
    <div>
      title: {meetingTitle}
      <br />
      type: {meetingType}
      <br />
      facilitator: {facilitator}
      <br />
      <i class="fas fa-pen"></i>
    </div>
  </div>
);

GatheringItem.propTypes = {
  gathering: PropTypes.object.isRequired
};

export default connect(null, {})(GatheringItem);
//post bg-white p-1 my-1
