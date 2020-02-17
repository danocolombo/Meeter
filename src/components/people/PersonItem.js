import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PersonItem = ({ person: { _id, name, email, phone } }) => (
  <div className="PersonBox">
    <div>
      {name}
      <br />
      phone: {phone}
      <br />
      email: {email}
      <br />
    </div>
  </div>
);

PersonItem.propTypes = {
  person: PropTypes.object.isRequired
};

export default connect(null, {})(PersonItem);
//post bg-white p-1 my-1
