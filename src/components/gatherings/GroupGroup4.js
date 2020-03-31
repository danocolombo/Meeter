import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { groups: state.group };
};

const GList = ({ groups }) => (
  <ul>
    {groups.map(grp => (
      <li key={grp.id}>{grp.title}</li>
    ))}
  </ul>
);

const GroupGroup = connect(mapStateToProps)(GList);

export default GroupGroup;