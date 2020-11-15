import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import DashLogo from '../../img/MMeeterLogo.png';
// import AttenChart from '../charts/AttenChart';
import AChart from '../charts/AttendanceChart';
import NextGathering from '../gatherings/NextGathering';
// import CheckPrivs from './CheckPrivs';
// import ClientDef from './ClientDef';
// import DashboardMeeterLogo from '../../img/DashboardMeeterLogo.png';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getGatherings } from '../../actions/gathering';

const Dashboard = ({
    getGatherings,
    getCurrentProfile,
    auth: { user, activeClient, token },
    gathering: { gatherings },
    profile: { settings, loading },
}) => {
    useEffect(() => {
        console.log('(1)');
        //check for activeClient, get it if needed
        console.log('activeClient: ' + activeClient);

        if (!activeClient) {
            // when first logging in, sometimes the delay
            // in processing might get us to dashboard
            // before activeClient is set. If undefined,
            // go get the users default client value

            getCurrentProfile();
        }
        if (gatherings.length === 0) {
            getGatherings({ activeClient });
        }
    }, [activeClient]);
    useEffect(() => {
        getCurrentProfile();
        if (activeClient) {
            getGatherings({ activeClient });
        }
    }, [getGatherings, getCurrentProfile]);
    // if (!token) {
    //     return <Redirect to='/login' />;
    // }
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {/* <h1 className="large text-primary">Dashboard</h1> */}
            <img className='dashboardLogo' src={DashLogo} alt='Meeter' />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome{' '}
                {settings && settings.name}
            </p>
            {/* <strong>What's happening...</strong>
            {privledgedInfo(auth)} */}
            <div className='chart-container'>
                {/* <AttenChart /> */}
                <AChart />
            </div>
        </Fragment>
    );
    function privledgedInfo(auth) {
        if (auth.activeStatus === 'approved') {
            return [
                <Fragment>
                    {/* <div>
                        <u>
                            <strong>What's happening...</strong>
                        </u>
                    </div> */}
                    <NextGathering gatherings={gatherings} />
                </Fragment>,
            ];
        } else {
            return [
                <div>
                    Please check with your system contact to get approved for
                    use.
                </div>,
            ];
        }
    }
};

Dashboard.propTypes = {
    getGatherings: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    gathering: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    gathering: state.gathering,
});

export default connect(mapStateToProps, {
    getGatherings,
    getCurrentProfile,
})(Dashboard);
