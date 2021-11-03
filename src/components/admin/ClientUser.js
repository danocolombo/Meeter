import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
    deleteClientUser,
    approveClientUser,
    suspendClientUser,
} from '../../actions/admin';

const ClientUser = ({
    deleteClientUser,
    approveClientUser,
    suspendClientUser,
    auth: { activeRole },
    auth,
    user: { _id, name, role, status },
    showActions,
}) => (
    // <div className='clientUser bg-white p-1 my-1'>
    <div
        className={
            status !== 'approved'
                ? 'clientUser bg-light-yellow p my'
                : 'clientUser bg-white p-1 my'
        }
    >
        <div>
            <h4>{name}</h4>
        </div>
        <div>
            {status === 'approved' && (
                <p className='my-1'>Current Role: {role}</p>
            )}
            {status !== 'approved' && (
                <p className='my-1'>
                    Requested Role:{' '}
                    <strong>
                        <u>{role}</u>
                    </strong>
                </p>
            )}

            {showActions && (
                <Fragment>
                    {status !== 'approved' && (
                        <button
                            onClick={() => approveClientUser(_id)}
                            type='button'
                            className='btn btn-success'
                        >
                            <i className='fas fa-thumbs-up' />
                        </button>
                    )}
                    {!auth.loading && role !== 'superuser' && (
                        <button
                            onClick={() => suspendClientUser(_id)}
                            type='button'
                            className='btn btn-light-blue'
                        >
                            <i className='fas fa-ban' />
                        </button>
                    )}
                    {!auth.loading && role !== 'superuser' && (
                        <button
                            onClick={() =>
                                deleteClientUser(auth.activeClient, _id)
                            }
                            type='button'
                            className='btn btn-danger'
                        >
                            <i className='fas fa-times' />
                        </button>
                    )}
                </Fragment>
            )}
        </div>
    </div>
);
ClientUser.defaultProps = {
    showActions: true,
};
ClientUser.propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteClientUser: PropTypes.func.isRequired,
    approveClientUser: PropTypes.func.isRequired,
    suspendClientUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    deleteClientUser,
    suspendClientUser,
    approveClientUser,
})(ClientUser);
