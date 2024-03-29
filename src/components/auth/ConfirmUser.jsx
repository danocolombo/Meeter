import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { dispatchThis } from '../../actions/dispatchMessage';
import { moveTempUserToProd } from '../../actions/auth';
import { addUserToClient } from '../../actions/admin';
import PropTypes from 'prop-types';
import './component.confirmUser.styles.scss';
// import {} from '../../actions/auth';

const ConfirmUser = ({
    dispatchThis,
    registeredName,
    moveTempUserToProd,
    addUserToClient,
}) => {
    const history = useHistory();
    // variables for the form
    const [userName, setUserName] = useState('');
    const [code, setCode] = useState('');

    const matchesSM = useMediaQuery('(min-width:400px)');
    const matchesMD = useMediaQuery('(min-width:600px)');
    // const thisVersion = process.env.REACT_APP_MEETER_VERSION;
    // const handleChange = (e) => {
    //     alert('yep');
    //     dispatchThis('test', 'green');
    // };
    // const handleGreenButton = (e) => {
    //     dispatchThis('GREEN', 'green');
    // };
    // const handleRedButton = (e) => {
    //     dispatchThis('RED', 'red');
    // };
    useEffect(() => {
        if (registeredName !== '0') {
            setUserName(registeredName);
        } else {
            setUserName('');
        }
    }, []);
    // useEffect(() => {}, [pateSystem.showSpinner]);
    const handleCancelClick = (event) => {
        event.preventDefault();
        history.push('/');
    };
    const handleSubmitClick = (event) => {
        event.preventDefault();
        let alertPayload = {};
        if (!userName) {
            dispatchThis('Your username is required', 'red');
            return null;
        }
        if (!code) {
            dispatchThis(
                'Please check your email and enter the confirmation code.',
                'red'
            );
            return null;
        }
        if (userName.length < 4 || code.length < 6) {
            alertPayload = {
                msg: 'User Name and Code are required.',
                alertType: 'danger',
            };
            dispatchThis(alertPayload.msg, 'red');
            return;
        }
        // setSpinner();
        try {
            Auth.confirmSignUp(userName, code)
                .then((data) => {
                    moveTempUserToProd(userName)
                        .then((moveResponse) => {
                            alertPayload = {
                                msg: 'Your registration is verified.',
                                alertType: 'success',
                            };
                            dispatchThis(alertPayload.msg, 'green');
                            // history.push('/login');
                        })
                        .catch((err) => {
                            console.log('catch');
                            alertPayload = {
                                msg:
                                    'Account confirmed, issues with profile.\nProceed to Login.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            dispatchThis(alertPayload, 'yellow');
                            history.push('/login');
                        });
                    // addUserToClient(userName)
                    //     .then((res) => {
                    //         alertPayload = {
                    //             msg: 'Your role needs to be reviewed.',
                    //             alertType: 'success',
                    //         };
                    //         dispatchThis(alertPayload.msg, 'green');
                    //         history.push('/login');
                    //     })
                    //     .catch((err) => {
                    //         alertPayload = {
                    //             msg:
                    //                 'Please have admin review your role & status\n[' +
                    //                 err.message +
                    //                 ']',
                    //             alertType: 'danger',
                    //         };
                    //         dispatchThis(alertPayload, 'yellow');
                    //     });
                })
                .catch((err) => {
                    switch (err.code) {
                        case 'CodeMismatchException':
                            alertPayload = {
                                msg: 'Code Mismatch\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'UsernameExistsException':
                            alertPayload = {
                                msg:
                                    'User Already Exists.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'NotAuthorizedException':
                            alertPayload = {
                                msg:
                                    'Invalid coded provided.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                        default:
                            alertPayload = {
                                msg:
                                    'User Validation Error.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    dispatchThis(alertPayload.msg, 'red');
                    // setAlert(alertPayload);
                    // window.scrollTo(0, 0);
                    // clearSpinner();
                    return;
                });
        } catch (error) {
            alertPayload = {
                msg:
                    'Unexpected User Validation Error.\n[' +
                    error.message +
                    ']',
                alertType: 'danger',
            };
            console.log('error:' + error);
            window.scrollTo(0, 0);
            // clearSpinner();
            return;
        }
        // clearSpinner();
        // history.push('/signin');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'code':
                setCode(value);
                break;
            default:
                break;
        }
    };
    return (
        <div className='register-confirm-page__wrapper'>
            <h1 className='large text-primary'>Confirm Account</h1>
            <div className='register-confiirm-page__instructions'>
                Check your email for a confirmation code <br />& enter below to
                confirm your registration.
            </div>
            <div className='register-confiirm-page__input-line'>
                <div className='register-confirm-page__input-label'>
                    User Name
                </div>
                <div className='register-confirm-page__input-control'>
                    <input
                        type='text'
                        name='userName'
                        id='userName'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='register-confiirm-page__input-line'>
                <div className='register-confirm-page__input-label'>Code</div>
                <div className='register-confirm-page__input-control'>
                    <input
                        type='text'
                        id='code'
                        name='code'
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        required
                    />
                </div>
            </div>
            <div className='confirm-user-component__button-wrapper'>
                <button
                    className='register-confirm-page__button-control'
                    onClick={handleSubmitClick}
                >
                    CONFIRM
                </button>

                <button
                    className='register-confirm-page__button-cancel-control'
                    onClick={handleCancelClick}
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
};

ConfirmUser.propTypes = {
    dispatchThis: PropTypes.func.isRequired,
    moveTempUserToProd: PropTypes.func.isRequired,
    addUserToClient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    dispatchThis,
    moveTempUserToProd,
    addUserToClient,
})(ConfirmUser);
