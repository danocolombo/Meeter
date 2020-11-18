import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getClientsForUser } from '../../actions/profile';

const UserProfileClients = ({ uid }) => {
    return [
        <Fragment>
            <p>seeking client info for {uid}</p>
            {availableClients(uid)}
        </Fragment>,
    ];
};
function availableClients(uid) {
    const clients = getClientsForUser(uid);
    console.log('in components/profile/UserProfileClients :: availableClients');
    console.log('clients: ' + typeof clients);
    return [
        <Fragment>
            <div>Wow, we are getting somewhere...</div>
        </Fragment>,
    ];
}
UserProfileClients.propTypes = {
    uid: PropTypes.object.isRequired,
};
export default UserProfileClients;
