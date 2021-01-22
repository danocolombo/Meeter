import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Groups = ({ match, meeting, getGroup }) => {
    useEffect(() => {
        if (typeof meeting.tmpGroup.id === 'undefined') {
            if (match.params.gid !== 0) {
                getGroup(match.params.gid);
            }
        }

        // return () => {
        //     cleanup
    }, [!meeting.tmpGroupLoaded]);
    return (
        <div>
            <h3>TEST</h3>
            <div>meeting: {match.params.mid}</div>
        </div>
    );
};
Groups.propTypes = {
    meeting: PropTypes.object.isRequired,
    getGroup: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    meeting: state.meeting,
});

export default connect(mapStateToProps, { getGroup })(withRouter(Groups));
