import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group';

const GroupGroup = ({
    auth,
    deleteGroup,
    group: { _id, title, facilitator, location }
}) => <div>Yep</div>;

GroupGroup.propTypes = {
    auth: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    deleteGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, deleteGroup)(GroupGroup);
