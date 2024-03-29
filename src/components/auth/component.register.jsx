import React, { useState } from 'react';
// import { setAlert } from "../../actions/alert";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { StylesContext } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { FormHelperText } from '@material-ui/core';
import BasicDatePicker from '../utils/basicDatePicker';
// import PhoneComponent from "../utils/phoneNumberInput";
import { register } from '../../actions/login';

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
        '@media (max-width: 500px)': {
            paddingBottom: '5px',
        },
    },
    firstNameInput: {},
    lastNameWrapper: {
        // border: "1px solid blue",
        backgroundColor: '#f1f1f1',
        paddingTop: '5px',
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
    emailInput: {
        marginTop: '10px',
        maxWidth: '600px',
        minWidth: '50vw',
    },
    checkLoginWrapper: {
        marginLeft: '1em',
    },
    checkLoginInput: {
        // paddingLeft: "1em",
        // marginLeft: "1em",
    },
    userNameWrapper: {
        // border: "1px solid blue",
        // backgroundColor: "#f1f1f1",
        marginBottom: '5px',
    },
    userNameLabel: {
        paddingRight: '1em',
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
    passwordLabel: { paddingRight: '1em' },
    breakLineWrapper: {
        marginBottom: '1em',
    },
    optionalWrapper: {
        border: '2px double blue',
        padding: '3px',
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
    phoneWrapper: {
        // border: "1px solid blue",
        backgroundColor: '#f1f1f1',
        marginRight: '1em',
        marginBottom: '1em',
    },
    phoneLabel: {
        // paddingRight: "1em",
    },
    birthdayLabel: {
        paddingRight: '1em',
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
    shirtLabel: { margin: 0, padding: 0 },
    shirtInput: { margin: 0, padding: 0, textAlign: 'right' },
}));

const Signup = ({ props, onChange }) => {
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
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [shirt, setShirt] = useState('');

    //   const theme = useTheme();
    const matchesSM = useMediaQuery('(min-width:400px)');
    const matchesMD = useMediaQuery('(min-width:600px)');
    const handleLoginDef = (e) => {
        setUserNameIsVisible(!userNameIsVisible);
    };
    const handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    const handleBirthdayChange = (e) => {
        setBirthday(e.target.value);
    };
    const handleDateChange = (event) => {
        setBirthday(event.target.value);
        // alert("Birthday:" + birthday);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        let okay2go = true;
        // first name needs to be more than chars and only text.
        let myRegxp = /^([a-zA-Z0-9_-]){3,15}$/;
        if (myRegxp.test(firstName) == false) {
            alert('First Name needs to be 3 characters or more');
            window.scrollTo(0, 0);
            return;
        }
        if (myRegxp.test(lastName) == false) {
            alert('Last Name needs to be 3 characters or more');
            window.scrollTo(0, 0);
            return;
        }
        if (gender === '?') {
            alert('Please select your gender');
            window.scrollTo(0, 0);
            return;
        }
        let emailRegex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (emailRegex.test(email) == false) {
            alert('email is not supported');
            window.scrollTo(0, 0);
            return;
        }
        let userNameRegex = /^([a-zA-Z0-9_-]){1,100}$/;

        if (!userNameIsVisible && userName.length < 1) {
            alert(
                'You need to provide a username or indicate you are going to use your email'
            );
            window.scrollTo(0, 0);
            return;
        }
        userNameRegex = /^([a-zA-Z0-9_-]){5,15}$/;
        if (!userNameIsVisible && userNameRegex.test(userName) == false) {
            alert(
                'Usernames have to be 5-15 in length, using letters, numbers, dash (-) or underscore (_)\nIf you want to use your email, check the box above.'
            );
            window.scrollTo(0, 0);
            return;
        }
        if (password1 !== password2) {
            alert('your passwords need to match');
            window.scrollTo(0, 0);
            return;
        }
        let passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/;
        if (passwordRegex.test(password1) == false) {
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
        const theRequest = {
            email: email,
            password: password1,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
        };
        if (userNameIsVisible) {
            //------------------------------------
            // want to use email as userName
            //------------------------------------
            theRequest.preferred_username = email;
        } else {
            theRequest.preferred_username = userName;
        }
        // check for optional information
        if (address) {
            theRequest.address = address;
        }
        if (phone) {
            const phoneRegex =
                /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
            if (phoneRegex.test(phone) == false) {
                alert('Phone number is invalid');
                window.scrollTo(0, 0);
                return;
            }
            theRequest.phone = phone;
        }
        if (birthday) {
            theRequest.birthday = birthday;
        }
        if (shirt) {
            theRequest.shirt = shirt;
        }
        register(theRequest);
        // alert("see console log");
        // console.log(theRequest);

        // window.scrollTo(0, 0);
    };
    return (
        <>
            <form className='form' onSubmit={onSubmit}>
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
                        <div>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.emailInput}
                            />
                        </div>
                        <div className={classes.checkLoginWrapper}>
                            <FormControlLabel
                                value='end'
                                control={<Checkbox />}
                                className={classes.checkLoginInput}
                                label='use for login'
                                labelPlacement='end'
                                onClick={() => handleLoginDef()}
                            />
                        </div>
                    </div>
                    {!userNameIsVisible ? (
                        <div className={classes.regRow}>
                            <div className={classes.userNameWrapper}>
                                <div className={classes.userNameLabel}>
                                    Username
                                </div>
                                <input
                                    type='text'
                                    placeholder='username'
                                    name='userName'
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    className={classes.userNameInput}
                                />
                            </div>
                        </div>
                    ) : null}
                    <div className={classes.regRow}>
                        <div className={classes.passwordWrapper}>
                            <div className={classes.passwordLabel}>
                                Password
                            </div>
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
                        <div className={classes.tRow}>
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
                        </div>
                        <div className={classes.regRow}>
                            <div className={classes.phoneWrapper}>
                                {/* <div className={classes.phoneLabel}>Phone</div>
                <div>
                  <input
                    type="text"
                    placeholder="(208) 340-1234"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={classes.phoneInput}
                  />
                </div> */}
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
                                    label='Select Date'
                                    type='date'
                                    defaultValue={birthday}
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
                    />
                </div>
            </form>
        </>
    );
};
export default Signup;
