import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { setAlert, setRegisterAlert } from '../../actions/alert';
import { dispatchThis } from '../../actions/dispatchMessage';
import { register } from '../../actions/login';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { NativeSelect } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { saveTemporaryRegistration } from '../../actions/auth';
import {
    ExplicitAuthFlowsType,
    UpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const Register = ({
    dispatchThis,
    register,
    isAuthenticated,
    saveTemporaryRegistration,
}) => {
    //   const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     password2: "",
    //   });

    //   const { name, email, password, password2 } = formData;

    //   const onChange = (e) =>
    //     setFormData({ ...formData, [e.target.name]: e.target.value });

    //   const onSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(`firstName:${document.regForm.firstName}`);
    //     if (password !== password2) {
    //       setAlert("Passwords do not match", "danger");
    //     } else {
    //       register({ name, email, password });
    //     }
    //   };
    const useStyles = makeStyles((theme) => ({
        mainContainer: {
            border: '1px solid blue',
            backgroundColor: '#f1f1f1',
            padding: '5px',
        },
        regRow: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flexCenter',
            //flexDirection: "row",
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            // "@media (max-width: 500px)": {
            // fiexDirection: "column",
            // },
        },
        firstNameWrapper: {
            // border: "1px solid blue",
            // backgroundColor: "#f1f1f1",
            paddingTop: '5px',
            paddingRight: '1em',
            fontWeight: 'bold',
            '@media (max-width: 500px)': {
                paddingBottom: '5px',
            },
        },
        firstNameInput: {},
        lastNameWrapper: {
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            paddingTop: '5px',
            fontWeight: 'bold',
            '@media (max-width: 500px)': {
                paddingBottom: '5px',
            },
        },
        lastNameInput: {},
        genderWrapper: {
            minWidth: '100px',
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            // justifyContent: "center",
            textAlign: 'center',
            fontWeight: 'bold',
            // "@media (max-width: 600px)": {
            //   textAlign: "left",
            //   marginBottom: "1em",
            // },
        },
        genderInput: {
            border: '1px solid blue',
            paddingLeft: '1em',
            fontSize: 'small',
            padding: 0,
            // backgroundColor: "#f1f1f1",
        },
        emailLabel: {
            fontWeight: 'bold',
            marginTop: '.5em',
        },
        emailInput: {
            maxWidth: '600px',
            width: '400px',
            // minWidth: '50vw',
        },
        // checkLoginWrapper: {
        //     marginLeft: '1em',
        // },
        // checkLoginInput: {
        //     // paddingLeft: "1em",
        //     // marginLeft: "1em",
        // },
        userNameWrapper: {
            // border: "1px solid blue",
            // backgroundColor: "#f1f1f1",
            marginBottom: '5px',
        },
        userNameLabel: {
            paddingRight: '1em',
            fontWeight: 'bold',
            marginTop: '.5em',
        },
        userNameInput: {
            maxWidth: '200px',
        },
        passwordWrapper: {
            // border: "1px solid blue",
            // backgroundColor: "#f1f1f1",
            backgroundColor: '#f1f1f1',
        },
        passwordInput: {
            backgroundColor: '#ffffff',
            marginBottom: '10px',
        },
        passwordLabel: {
            paddingRight: '1em',
            fontWeight: 'bold',
            marginTop: '.5em',
        },
        breakLineWrapper: {
            marginBottom: '1em',
        },
        optionalWrapper: {
            border: '2px double blue',
            padding: '15px',
            marginBottom: '1em',
        },
        breakLine: {
            height: '5px',
            color: 'blue',
            backgroundColor: 'blue',
            borderRadius: '20px',
            marginTop: 0,
            marginBottom: 0,
        },
        optionalLabel: {
            textAlign: 'center',
            paddingTop: 0,
        },
        addressLabel: {
            paddingRight: '1em',
        },
        addressInput: {
            // border: "1px solid blue",
            // backgroundColor: "#f1f1f1",
            width: '70vw',
            marginBottom: '1em',
        },
        streetLabel: {
            fontWeight: 'bold',
        },
        streetControl: {
            textAlign: 'left',
            width: '400px',
        },
        cityLabel: {
            marginTop: '1em',
            fontWeight: 'bold',
        },
        cityControl: {
            textAlign: 'left',
            width: '200px',
        },
        stateLabel: {
            fontWeight: 'bold',
            marginTop: '1em',
        },
        stateControl: {
            textAlign: 'left',
        },
        postalCodeLabel: {
            fontWeight: 'bold',
            marginTop: '1em',
        },
        postalCodeControl: {
            textAlign: 'left',
        },
        phoneWrapper: {
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            marginRight: '1em',
            marginBottom: '1em',
        },
        phoneLabel: {
            // paddingRight: "1em",
            fontWeight: 'bold',
            marginTop: '1em',
        },
        birthdayLabel: {
            paddingRight: '1em',
            fontWeight: 'bold',
        },
        birthdayWrapper: {
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            paddingRight: '1em',
            marginBottom: '1em',
            // marginTop: "1em",
        },
        shirtWrapper: {
            // border: "1px solid blue",
            backgroundColor: '#f1f1f1',
            paddingLeft: '2px',
            // marginLeft: "1em",
            // marginTop: ".5em",
        },
        shirtLabel: { margin: 0, padding: 0, fontWeight: 'bold' },
        shirtInput: { margin: 0, padding: 0 },
    }));
    const history = useHistory();
    const classes = useStyles();
    const [userNameIsVisible, setUserNameIsVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('?');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [shirt, setShirt] = useState('');

    //   const theme = useTheme();
    const matchesSM = useMediaQuery('(min-width:400px)');
    const matchesMD = useMediaQuery('(min-width:600px)');
    const handleLoginDef = (e) => {
        setUserNameIsVisible(!userNameIsVisible);
    };
    // const handleInputChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value,
    //     });
    // };
    // const handleBirthdayChange = (e) => {
    //     setBirthday(e.target.value);
    // };
    const handleDateChange = (event) => {
        setBirthday(event.target.value);
        // alert("Birthday:" + birthday);
    };
    const handleSubmitClick = (e) => {
        //NOTE: username set to lowercase
        setUserName(String(userName).toLowerCase());
        e.preventDefault();
        // let alertPayload = {};
        let userAttributes = {};
        // let okay2go = true;
        // first name needs to be more than chars and only text.
        let myRegxp = /^([a-zA-Z0-9_-]){3,15}$/;
        if (myRegxp.test(firstName) === false) {
            alert('First Name needs to be 3 characters or more');
            window.scrollTo(0, 0);
            return;
        }
        userAttributes.given_name = firstName;
        if (myRegxp.test(lastName) === false) {
            alert('Last Name needs to be 3 characters or more');
            window.scrollTo(0, 0);
            return;
        }
        userAttributes.family_name = lastName;
        if (gender === '?') {
            alert('Please select your gender');
            window.scrollTo(0, 0);
            return;
        }
        let emailRegex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (emailRegex.test(email) === false) {
            alert('email is not supported');
            window.scrollTo(0, 0);
            return;
        }
        userAttributes.email = email;

        let userNameRegex = /^([a-zA-Z0-9_-]){1,100}$/;
        if (!userNameIsVisible && userName.length < 1) {
            alert(
                'You need to provide a username or indicate you are going to use your email'
            );
            window.scrollTo(0, 0);
            return;
        }
        userNameRegex = /^([a-zA-Z0-9_-]){5,15}$/;
        if (!userNameIsVisible && userNameRegex.test(userName) === false) {
            alert(
                'Usernames have to be 5-15 in length, using letters, numbers, dash (-) or underscore (_)\nIf you want to use your email, check the box above.'
            );
            window.scrollTo(0, 0);
            return;
        }
        userAttributes.preferred_username = userName;

        if (password1 !== password2) {
            alert('your passwords need to match');
            window.scrollTo(0, 0);
            return;
        }
        let passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/;
        if (passwordRegex.test(password1) === false) {
            alert(
                'Password requirements:\n' +
                    '  minimum length of 8\n' +
                    '  at lease one number\n' +
                    '  at least one special character\n' +
                    '  at least one upper case character\n' +
                    '  at least one lower case cahracter'
            );
            window.scrollTo(0, 0);
            return;
        }
        let epochTime = Math.floor(Date.now() / 1000);
        let oneHourFromNow = epochTime + 3600;

        let temporaryRegistrationInfo = {
            expiration: oneHourFromNow,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        // if (address) {
        //     userAttributes.address = address;
        //     temporaryRegistrationInfo.address = address;
        // }
        if (street) {
            userAttributes.street = street;
            temporaryRegistrationInfo.street = street;
        }
        if (city) {
            userAttributes.city = city;
            temporaryRegistrationInfo.city = city;
        }
        if (stateProv) {
            userAttributes.stateProv = stateProv;
            temporaryRegistrationInfo.stateProv = stateProv;
        }
        if (postalCode) {
            userAttributes.postalCode = postalCode;
            temporaryRegistrationInfo.postalCode = postalCode;
        }
        if (phone) {
            const phoneRegex =
                /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
            if (phoneRegex.test(phone) === false) {
                alert('Phone number is invalid');
                window.scrollTo(0, 0);
                return;
            } else {
                // the phone number is acceptable, now convert for cognito
                // format has to be +12345678901
                // 1. remove special chars () and - as well as space
                let updatePhone = phone.replace('(', '');
                updatePhone = updatePhone.replace(')', '');
                updatePhone = updatePhone.replace(' ', '');
                updatePhone = updatePhone.replace('-', '');
                // 2. now add +1 to front of number
                updatePhone = '+1' + updatePhone;

                userAttributes.phone = updatePhone;
                temporaryRegistrationInfo.phone = updatePhone;
            }
        }
        if (birthday) {
            userAttributes.birthdate = birthday;
            temporaryRegistrationInfo.birthday = birthday;
        }
        if (shirt) {
            // userAttributes.shirt = shirt;
            temporaryRegistrationInfo.shirt = shirt;
        }
        userAttributes = {
            email: email,
            given_name: firstName,
            family_name: lastName,
            gender: gender,
            preferred_username: userName,
        };
        // check for optional information

        //   REGISTER THE USER !!!!!!!!
        console.log('userAttributes: \n', userAttributes);

        try {
            //   +++++++++++++++++++++++++++
            //   THIS WORKS, IMPLEMENTED
            //   +++++++++++++++++++++++++++
            // Auth.signUp({
            //     Username: 'snoopy4',
            //     Password: 'Feb2022!',
            //     attributes: {
            //         email: 'joecool@peanuts.com',
            //         given_name: 'joe',
            //         family_name: 'cool',
            //         gender: 'm',
            //         phone_number: '+12345678901',
            //     },
            // });
            //   +++++++++++++++++++++++++++
            //   SCREWS UP REQUEST, NON-FUNCTIONAL
            //   +++++++++++++++++++++++++++
            // Auth.signUp({
            //     ClientId: "521ktk6vc6v3ddj8gh6qicnblt'",
            //     username: 'snoopy5',
            //     password: 'Misery2022!',
            //     attributes: [
            //         { Name: 'email', Value: 'joecool@peanuts.com' },
            //         { Name: 'given_name', Value: 'joe' },
            //         { Name: 'family_name', Value: 'cool' },
            //         { Name: 'gender', Value: 'm' },
            //         { Name: 'phone_number', Value: '+12345678901' },
            //         { Name: 'email', Value: 'jcool@peanuts.com' },
            //         { Name: 'username', Value: 'snoopy5' },
            //     ],
            //     ValidationData: null,
            // })
            Auth.signUp({
                username: userName,
                password: password1,
                attributes: userAttributes,
            })
                .then((data) => {
                    dispatchThis('SUCCESS, NOW CONFIRM...', 'green');
                    //============================================
                    // save the registration info for future use
                    //============================================
                    // data.user_sub is the cognito userId
                    saveTemporaryRegistration(
                        data.userSub,
                        temporaryRegistrationInfo
                    );
                    let url = '/confirmUser/' + userName;
                    history.push(url);
                })
                .catch((err) => {
                    // if (err) {
                    //     err.forEach((err) => dispatch(setAlert(err.message, 'danger')));
                    // }
                    switch (err.code) {
                        case 'UsernameExistsException':
                            // alert('1');
                            dispatchThis(err.message, 'red');
                            // alertPayload = {
                            //     msg: err.message,
                            //     alertType: 'danger',
                            // };

                            console.log('ERR1: err.code');
                            break;
                        case 'InvalidPasswordException':
                            // alert('2');
                            dispatchThis(err.message, 'red');
                            // alertPayload = {
                            //     msg:
                            //         'Password does not meet requirements.\n[' +
                            //         err.message +
                            //         ']',
                            //     alertType: 'danger',
                            //     timeout: 10000,
                            // };
                            break;
                        default:
                            // alert('3');
                            dispatchThis(err.message, 'red');
                            // alertPayload = {
                            //     msg:
                            //         'Registration error: [' +
                            //         JSON.stringify(err) +
                            //         ']',
                            //     alertType: 'danger',
                            //     timeout: 10000,
                            // };

                            break;
                    }
                });
        } catch (error) {
            // alert('4');
            dispatchThis(
                'Registration error: [' + JSON.stringify(error) + ']',
                'red'
            );

            console.log('error:' + error);
        }
    };
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Create Your Account
            </p>
            <div name='container' className={classes.mainContainer}>
                <div name='row' className={classes.regRow}>
                    <div name='col1' className={classes.firstNameWrapper}>
                        First Name
                        <br />
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={classes.firstNameInput}
                        />
                    </div>
                    <div name='col2' className={classes.lastNameWrapper}>
                        Last Name
                        <br />
                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={classes.lastNameInput}
                        />
                    </div>
                    <div name='col3' className={classes.genderWrapper}>
                        Gender
                        <br />
                        <NativeSelect
                            defaultValue={'?'}
                            className={classes.genderInput}
                            onChange={(e) => setGender(e.target.value)}
                            inputProps={{
                                name: 'gender',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={'?'}>?</option>
                            <option value={'f'}>F</option>
                            <option value={'m'}>M</option>
                        </NativeSelect>
                    </div>
                </div>
                <div className={classes.regRow}>
                    <div className={classes.emailWrapper}>
                        <div className={classes.emailLabel}>Email</div>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.emailInput}
                        />
                    </div>
                </div>

                <div className={classes.regRow}>
                    <div className={classes.userNameWrapper}>
                        <div className={classes.userNameLabel}>Username</div>
                        <input
                            type='text'
                            placeholder='username'
                            name='userName'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={classes.userNameInput}
                        />
                    </div>
                </div>

                <div className={classes.regRow}>
                    <div className={classes.passwordWrapper}>
                        <div className={classes.passwordLabel}>Password</div>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password1'
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            className={classes.passwordInput}
                        />
                    </div>
                </div>
                <div className={classes.regRow}>
                    <div className={classes.passwordWrapper}>
                        <div className={classes.passwordLabel}>
                            Password Confirmation
                        </div>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password1'
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            className={classes.passwordInput}
                        />
                    </div>
                </div>
                {/* //    OPTIONAL SEPARATOR  */}

                <div className={classes.breakLineWrapper}>
                    <hr className={classes.breakLine} />
                    <div className={classes.optionalLabel}>
                        OPTIONAL INFORMATION
                    </div>
                    <hr className={classes.breakLine} />
                </div>
                <div className={classes.optionalWrapper}>
                    {/* <div className={classes.tRow}>
                        <div className={classes.addressLabel}>Address</div>
                        <div>
                            <input
                                type='text'
                                placeholder='Street, City, State, Postal Code'
                                name='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={classes.addressInput}
                            />
                        </div>
                    </div> */}
                    <div className={classes.tRow}>
                        <div className={classes.streetLabel}>Street</div>
                        <div>
                            <input
                                type='text'
                                placeholder=''
                                name='street'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className={classes.streetControl}
                            />
                        </div>
                    </div>
                    <div className={classes.tRow}>
                        <div className={classes.cityLabel}>City</div>
                        <div>
                            <input
                                type='text'
                                placeholder=''
                                name='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={classes.cityControl}
                            />
                        </div>
                    </div>
                    <div className={classes.tRow}>
                        <div className={classes.stateLabel}>State</div>
                        <div>
                            <input
                                type='text'
                                placeholder=''
                                name='stateProv'
                                value={stateProv}
                                onChange={(e) => setStateProv(e.target.value)}
                                className={classes.stateControl}
                            />
                        </div>
                    </div>
                    <div className={classes.tRow}>
                        <div className={classes.postalCodeLabel}>Postal</div>
                        <div>
                            <input
                                type='number'
                                placeholder=''
                                name='postalCode'
                                value={postalCode}
                                min='10000'
                                max='99999'
                                width='5'
                                onChange={(e) => setPostalCode(e.target.value)}
                                className={classes.postalCodeControl}
                            />
                        </div>
                    </div>
                    <div className={classes.tRow}>
                        <div className={classes.phoneLabel}>Telephone</div>
                        <div className={classes.phoneWrapper}>
                            <input
                                type='phone'
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='phoneInput'
                            />
                        </div>
                        <div className={classes.birthdayWrapper}>
                            <div className={classes.birthdayLabel}>
                                Birthday
                            </div>
                            {/* <BasicDatePicker dateLabel="Birthday" theDate={birthday} onChange={(e) => setBirthday(e.target.value)}/> */}
                            <TextField
                                id='date'
                                // label='Select Date'
                                type='date'
                                // defaultValue={birthday}
                                value={birthday}
                                format='MM/dd/yyyy'
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <div className={classes.shirtWrapper}>
                                <div className={classes.shirtLabel}>
                                    Shirt Size
                                </div>
                                <div className={classes.shirtInput}>
                                    <NativeSelect
                                        defaultValue={'?'}
                                        className={classes.shirtInput}
                                        // onChange={(e) => setShirt(value)}
                                        onChange={(e) =>
                                            setShirt(e.target.value)
                                        }
                                        inputProps={{
                                            name: 'shirt',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={''}>?</option>
                                        <option value={'s'}>S</option>
                                        <option value={'m'}>M</option>
                                        <option value={'l'}>L</option>
                                        <option value={'xl'}>XL</option>
                                        <option value={'xxl'}>2 XL</option>
                                        <option value={'xxxl'}>3 XL</option>
                                        <option value={'xxxl'}>4 XL</option>
                                    </NativeSelect>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Register'
                    onClick={handleSubmitClick}
                />
            </div>

            {/* <RegisterOptionalInfo /> */}
            <div>
                <div className='register-user-page__offer-confirm-box'>
                    Have you registered and need to confirm your account?
                    <Link className='NEED_TO_DEFINE' to='/confirm'>
                        {' '}
                        Click here
                    </Link>
                </div>
            </div>

            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    dispatchThis: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    saveTemporaryRegistration: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    setAlert,
    dispatchThis,
    register,
    saveTemporaryRegistration,
})(Register);
