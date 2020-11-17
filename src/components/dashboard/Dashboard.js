import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DashboardPic from '../../img/Dashboard1-200.png';
import DashLogo from '../../img/MMeeterLogo.png';
// import DashboardMeeterLogo from '../../img/DashboardMeeterLogo.png';
// import Experience from './Experience';
// import Education from './Education';
// import { getCurrentProfile, deleteAccount } from '../../actions/profile';
//import auth from '../../../../../meeter4/Beta1.5.2/client/src/reducers/auth';

const Dashboard = ({ auth }) => {
    useEffect(() => {
        if (!auth.token || auth.isAuthenticated === null) {
            return <Redirect to='/login' />;
        }
    }, []);
    // useEffect(() => {
    //     getCurrentProfile();
    // }, [getCurrentProfile]);

    return auth.loading && auth.user === null ? (
        <Spinner />
    ) : (
        <Fragment>
            {/* <h1 className="large text-primary">Dashboard</h1> */}
            <img className='dashboardLogo' src={DashLogo} />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome{' '}
                {auth.user && auth.user.firstName}
            </p>
            {auth.user !== null ? (
                <Fragment>
                    <h2>Now the fun begins</h2>
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
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
