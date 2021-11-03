import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/login';
import DashLogo from '../../img/MMeeterLogo-Centered-M.png';
const Navbar = ({ auth, meeter, logout }) => {
    const authLinks = (
        <Fragment>
            <ul>
                {auth.user && meeter.active.status === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to='/gatherings'>
                                <i className='far fa-calendar-alt'></i>{' '}
                                <span className='hide-sm'>Meetings</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li></li>
                    </Fragment>
                )}
                {auth.user &&
                meeter.active.role !== 'guest' &&
                meeter.active.status === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to='/people'>
                                <i className='fa fa-users'></i>{' '}
                                <span className='hide-sm'>People</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : null}
                {auth.user &&
                (meeter.active.role === 'superuser' ||
                    meeter.active.role === 'owner') &&
                meeter.active.status === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to='/Config'>
                                <i className='fa fa-cog'></i>{' '}
                                <span className='hide-sm'> Admin</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : null}

                {auth.user && meeter.active.status === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to={`/userprofile`}>
                                <i className='fas fa fa-user' />{' '}
                                <span className='hide-sm'>Profile</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li></li>
                    </Fragment>
                )}
                <li>
                    <a onClick={logout} href='/login'>
                        <i className='fas fa-sign-out-alt' />{' '}
                        <span className='hide-sm'>Logout</span>
                    </a>
                </li>
            </ul>
        </Fragment>
    );
    //=========================================================
    // following links are displayed to non-logged in visitors
    //=========================================================
    const guestLinks = (
        <ul>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <img
                        className='dashboardLogo dashboardLogo-sm'
                        alt=''
                        src={DashLogo}
                    />
                    {/* <i className='fa fa-cubes' /> Meeter */}
                </Link>
            </h1>
            {!auth.loading && (
                <Fragment>
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});

export default connect(mapStateToProps, { logout })(Navbar);
