import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashLogo from '../../img/MMeeterLogo.png';

const Dashboard = ({ auth, meeter }) => {
    useEffect(() => {
        if (!auth.token || auth.isAuthenticated === null) {
            return <Redirect to='/login' />;
        }
    }, []);

    return auth.loading || meeter.loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <img className='dashboardLogo' alt='logo' src={DashLogo} />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome{' '}
                {auth.user && auth.user.firstName}
            </p>
            {auth.user !== null ? (
                <Fragment>
                    {auth.user.defaultClientRole === 'NOTSET' ? (
                        <div className='dashboard-component_welcome_message'>
                            Your account is being reviewed.
                            <br />
                            Check back soon...
                        </div>
                    ) : (
                        <div className='dashboard-component_welcome_message'>
                            Now the fun begins
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        There have been some challenges figuring out who you
                        are...
                    </p>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});

export default connect(mapStateToProps, {})(Dashboard);
