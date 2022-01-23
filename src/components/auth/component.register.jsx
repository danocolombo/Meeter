import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { NativeSelect } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StylesContext } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import { FormHelperText } from "@material-ui/core";
import BasicDatePicker from "../utils/basicDatePicker";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    padding: "5px",
  },
  regRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flexCenter",
    //flexDirection: "row",
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    // "@media (max-width: 500px)": {
    // fiexDirection: "column",
    // },
  },
  firstNameWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    paddingTop: "5px",
    paddingRight: "1em",
    "@media (max-width: 500px)": {
      paddingBottom: "5px",
    },
  },
  firstNameInput: {},
  lastNameWrapper: {
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    paddingTop: "5px",
    "@media (max-width: 500px)": {
      paddingBottom: "5px",
    },
  },
  lastNameInput: {},
  genderWrapper: {
    minWidth: "100px",
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    // justifyContent: "center",
    textAlign: "center",
    // "@media (max-width: 600px)": {
    //   textAlign: "left",
    //   marginBottom: "1em",
    // },
  },
  genderInput: {
    border: "1px solid blue",
    paddingLeft: "1em",
    // backgroundColor: "#f1f1f1",
  },
  emailInput: {
    marginTop: "10px",
    maxWidth: "600px",
    minWidth: "50vw",
  },
  checkLoginWrapper: {
    marginLeft: "1em",
  },
  checkLoginInput: {
    // paddingLeft: "1em",
    // marginLeft: "1em",
  },
  userNameWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    marginBottom: "5px",
  },
  userNameLabel: {
    paddingRight: "1em",
  },
  userNameInput: {
    maxWidth: "200px",
  },
  passwordWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    backgroundColor: "#f1f1f1",
  },
  passwordInput: {
    backgroundColor: "#ffffff",
    marginBottom: "10px",
  },
  passwordLabel: { paddingRight: "1em" },
  breakLineWrapper: {
    marginBottom: "1em",
  },
  optionalWrapper: {
    border: "2px double blue",
    padding: "3px",
    marginBottom: "1em",
  },
  breakLine: {
    height: "10px",
    color: "blue",
    backgroundColor: "blue",
    borderRadius: "20px",
    marginTop: 0,
    marginBottom: 0,
  },
  optionalLabel: {
    textAlign: "center",
    paddingTop: 0,
  },
  addressLabel: {
    paddingRight: "1em",
  },
  addressInput: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    width: "70vw",
    marginBottom: "1em",
  },
  phoneWrapper: {
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    marginRight: "1em",
    marginBottom: "1em",
  },
  phoneLabel: {
    // paddingRight: "1em",
  },
  birthdayLabel: {
    paddingRight: "1em",
  },
  birthdayWrapper: {
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    paddingRight: "1em",
    marginBottom: "1em",
    // marginTop: "1em",
  },
  shirtWrapper: {
    // border: "1px solid blue",
    backgroundColor: "#f1f1f1",
    paddingLeft: "2px",
    // marginLeft: "1em",
    // marginTop: ".5em",
  },
  shirtLabel: {margin: 0, padding: 0},
  shirtInput: {margin: 0, padding: 0, textAlign: "right"},
}));

const Signup = ({ props, onChange }) => {
  const classes = useStyles();
  const [userNameIsVisible, setUserNameIsVisible] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [shirt, setShirt] = useState("");
  const [nickname, setNickname] = useState("");

  //   const theme = useTheme();
  const matchesSM = useMediaQuery("(min-width:400px)");
  const matchesMD = useMediaQuery("(min-width:600px)");
  const handleLoginDef = (e) => {
    setUserNameIsVisible(!userNameIsVisible);
  };
  const handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div name="container" className={classes.mainContainer}>
        <div name="row" className={classes.regRow}>
          <div name="col1" className={classes.firstNameWrapper}>
            First Name
            <br />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={classes.firstNameInput}
            />
          </div>
          <div name="col2" className={classes.lastNameWrapper}>
            Last Name
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value=""
              // onChange={(e) => onChange(e)}
              className={classes.lastNameInput}
            />
          </div>
          <div name="col3" className={classes.genderWrapper}>
            Gender
            <br />
            <NativeSelect
              defaultValue={"?"}
              className={classes.genderInput}
              inputProps={{
                name: "gender",
                id: "uncontrolled-native",
              }}
            >
              <option value={""}>?</option>
              <option value={"f"}>F</option>
              <option value={"m"}>M</option>
            </NativeSelect>
          </div>
        </div>
        <div className={classes.regRow}>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value=""
              // onChange={(e) => onChange(e)}
              className={classes.emailInput}
            />
          </div>
          <div className={classes.checkLoginWrapper}>
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              className={classes.checkLoginInput}
              label="use for login"
              labelPlacement="end"
              onClick={() => handleLoginDef()}
            />
          </div>
        </div>
        {userNameIsVisible ? (
          <div className={classes.regRow}>
            <div className={classes.userNameWrapper}>
              <span className={classes.userNameLabel}>Username</span>
              <input
                type="text"
                placeholder="username"
                name="userName"
                value=""
                //   onChange={(e) => onChange(e)}
                className={classes.userNameInput}
              />
            </div>
          </div>
        ) : null}
        <div className={classes.regRow}>
          <div className={classes.passwordWrapper}>
            <div className={classes.passwordLabel}>Password</div>
            <input
              type="password"
              placeholder="Password"
              name="password1"
              value=""
              // onChange={(e) => onChange(e)}
              className={classes.passwordInput}
            />
          </div>
        </div>
        <div className={classes.regRow}>
          <div className={classes.passwordWrapper}>
            <div className={classes.passwordLabel}>Password Confirmation</div>
            <input
              type="password"
              placeholder="Password"
              name="password1"
              value=""
              // onChange={(e) => onChange(e)}
              className={classes.passwordInput}
            />
          </div>
        </div>
        {/* //    OPTIONAL SEPARATOR  */}

        <div className={classes.breakLineWrapper}>
          <hr className={classes.breakLine} />
          <div className={classes.optionalLabel}>OPTIONAL INFORMATION</div>
          <hr className={classes.breakLine} />
        </div>
        <div className={classes.optionalWrapper}>
          <div className={classes.tRow}>
            <div className={classes.addressLabel}>Address</div>
            <div>
              <input
                type="text"
                placeholder="123 Main St."
                name="address"
                value={address}
                // onChange={(e) => onChange(e)}
                className={classes.addressInput}
              />
            </div>
          </div>
          <div className={classes.regRow}>
            <div className={classes.phoneWrapper}>
              <div className={classes.phoneLabel}>Phone</div>
              <div>
                <input
                  type="text"
                  placeholder="(208) 340-1234"
                  name="phone"
                  value=""
                  // onChange={(e) => onChange(e)}
                  className={classes.phoneInput}
                />
              </div>
            </div>
            <div className={classes.birthdayWrapper}>
              <div className={classes.birthdayLabel}>Birthday</div>
              <BasicDatePicker dateLabel="Birthday" theDate={birthday} />
            </div>
            <div>
              <div className={classes.shirtWrapper}>
                <div className={classes.shirtLabel}>Shirt Size</div>
                <div className={classes.shirtInput}>
                  <NativeSelect
                    defaultValue={"?"}
                    className={classes.shirtInput}
                    inputProps={{
                      name: "shirt",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option value={""}>?</option>
                    <option value={"s"}>S</option>
                    <option value={"m"}>M</option>
                    <option value={"l"}>L</option>
                    <option value={"xl"}>XL</option>
                    <option value={"xxl"}>2 XL</option>
                    <option value={"xxxl"}>3 XL</option>
                    <option value={"xxxl"}>4 XL</option>
                  </NativeSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </div>
    </>
  );
};
export default Signup;
