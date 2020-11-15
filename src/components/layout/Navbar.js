import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Settings } from '@material-ui/icons';

const Navbar = ({
    auth: { isAuthenticated, loading, activeRole, activeStatus },
    auth,
    profile,
    logout,
}) => {
    const authLinks = (
        <Fragment>
            <ul>
                {/* <li>
                    <Link to='/gatherings'>
                        <i className='far fa-calendar-alt'></i>{' '}
                        <span className='hide-sm'>Meetings</span>
                    </Link>
                </li> */}
                {/* {(auth.activeRole === 'superuser' ||
                    auth.activeRole === 'owner') &&
                auth.activeStatus === 'approved' ? ( */}
                {auth.activeStatus === 'approved' ? (
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
                {auth.activeRole !== 'guest' &&
                auth.activeStatus === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to='/people'>
                                <i className='fa fa-users'></i>{' '}
                                <span className='hide-sm'>People</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : null}
                {(auth.activeRole === 'superuser' ||
                    auth.activeRole === 'owner') &&
                auth.activeStatus === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to='/DisplaySecurity'>
                                <i className='fa fa-cog'></i>{' '}
                                <span className='hide-sm'> Admin</span>
                            </Link>
                        </li>
                    </Fragment>
                ) : null}
                {auth.activeStatus === 'approved' ? (
                    <Fragment>
                        <li>
                            <Link to={`/UserProfile`}>
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
                    <a onClick={logout} href='#!'>
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
                    <i className='fa fa-cubes' /> Meeter
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
    // function getRole(user) {
    //     return null;
    //     // return user.activeRole;
    // }
    // function displayAuthenticatedMenu() {
    //     {
    //         // console.log(servants.length);
    //         // var peeps = '';
    //         // servants.forEach((peep) => {
    //         //     peeps = peeps + peep;
    //         // });
    //         // const sample =
    //         //     "<option value='Junior Developer'>Junior Developer</option>";
    //         // console.log(peeps);
    //         return [
    //             <ul>
    //                 <li>
    //                     <Link to='/gatherings'>
    //                         <i className='far fa-calendar-alt'></i>{' '}
    //                         <span className='hide-sm'>Meetings</span>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link to='/people'>
    //                         <i className='fas fa-user-shield'></i>{' '}
    //                         <span className='hide-sm'>People</span>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link to='/#'>
    //                         <i className='fas fa-chalkboard-teacher'></i>{' '}
    //                         <span className='hide-sm'>Training</span>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link to='/posts'>Posts</Link>
    //                 </li>
    //                 <li>
    //                     <Link to='/dashboard'>
    //                         <i className='fas fa-user' />{' '}
    //                         <span className='hide-sm'>Dashboard</span>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <a onClick={logout} href='#!'>
    //                         <i className='fas fa-sign-out-alt' />{' '}
    //                         <span className='hide-sm'>Logout</span>
    //                     </a>
    //                 </li>
    //             </ul>,
    //         ];
    //     }
    // }
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
