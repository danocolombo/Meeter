import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GatheringItem = ({
  gathering: { _id, meetingTitle, facilitator, meetingType }
}) => (
  <div className="PersonBox">
    <div>
      title: {meetingTitle}
      <br />
      type: {meetingType}
      <br />
      facilitator: {facilitator}
      <br />
    </div>
  </div>
);

GatheringItem.propTypes = {
  gathering: PropTypes.object.isRequired
};

export default connect(null, {})(GatheringItem);
//post bg-white p-1 my-1
