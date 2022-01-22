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
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    marginTop: "2em",
  },
  firstSectionContainer: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    
  },
  firstNameWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    
  },
  firstNameInput: {},
  lastNameWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  lastNameInput: {},
  genderWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    justifyContent: "center",
    textAlign: "center",
    "@media (max-width: 600px)": {
        textAlign: "left",
        marginBottom: "1em",
      },

  },
  genderInput: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  secondSectionContainer: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  emailWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  emailInput: {
    maxWidth: "600px",
  },
  checkLoginInput: {
    marginLeft: "1em",
  },
  userNameSectionContainer: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  userNameWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
  },
  userNameInput: {
    maxWidth: "200px",
  },
  passwordSectionContainer: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    backgroundColor: "#ffffff",
  },
  passwordWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    backgroundColor: "#ffffff",
  },
  passwordInput: {
    // border: "1px solid blue",
    backgroundColor: "#ffffff",
  },
  breakLine: {
    height: "10px",
    color: "blue",
    backgroundColor: "blue",
    borderRadius: "20px",
    marginTop: "2em",
    "@media (max-width: 700px)": {
      marginTop: "1em",
    },
  },
  addressWrapper: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    width: "100vw",
  },
  addressInput: {
    // border: "1px solid blue",
    // backgroundColor: "#f1f1f1",
    width: "900px",
  },
  birthdayWrapper: {
    marginTop: "1em",
  },
  shirtWrapper: {
    marginTop: ".5em",
  },
  nicknameWrapper: {
      marginBottom: "1em",
  },
  nicknameInput: {
    maxWidth: "200px",
  },
}));

export default function SignupRequired(props, onChange) {
  const classes = useStyles();
  const [userNameIsVisible, setUserNameIsVisible] = useState(true);
  //   const theme = useTheme();
  const matchesSM = useMediaQuery("(min-width:400px)");
  const matchesMD = useMediaQuery("(min-width:600px)");
  const handleLoginDef = (e) => {
    setUserNameIsVisible(!userNameIsVisible);
  };
  return (
    <div className={classes.mainContainer}>
      <Grid container className={classes.firstSectionContainer}>
        <Grid item xs={12} sm={5} className={classes.firstNameWrapper}>
          First Name
          <br />
          <input
            type="text"
            placeholder="First Name"
            name="email"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.firstNameInput}
          />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.lastNameWrapper}>
          Last Name
          <br />
          <input
            type="text"
            placeholder="Last Name"
            name="email"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.lastNameInput}
          />
        </Grid>
        <Grid item xs={12} sm={2} className={classes.genderWrapper}>
          {/* <Paper elevation={0} className={classes.genderInput}> */}
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
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Grid container className={classes.sectionContainer}>
        <Grid xs={12} sm={8} className={classes.emailWrapper}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.emailInput}
          />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.checkLoginInput}>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="use for login"
            labelPlacement="end"
            onClick={() => handleLoginDef()}
          />
        </Grid>
      </Grid>
      { userNameIsVisible ? 
        <Grid container className={classes.sectionContainer}>
          <Grid xs={12} className={classes.userNameWrapper}>
              Username
            <input
              type="text"
              placeholder="username"
              name="uName"
              value=""
              //   onChange={(e) => onChange(e)}
              className={classes.userNameInput}
            />
          </Grid>
        </Grid>
        : null }
      
      <Grid container className={classes.sectionContainer}>
        <Grid item xs={12} sm={5} className={classes.passwordWrapper}>
          Password
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password1"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.passwordInput}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.sectionContainer}>
        <Grid item xs={12} sm={5} className={classes.passwordWrapper}>
          Confirm Your Password
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password2"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.passwordInput}
          />
        </Grid>
      </Grid>
      
      <Grid container className={classes.sectionContainer}>
        <Grid item xs={12} className={classes.breakLineWrapper}>
          <hr className={classes.breakLine} />
        </Grid>
      </Grid>
      <Grid container className={classes.sectionContainer}>
        <Grid xs={12} className={classes.addressWrapper}>
          Address
          <br />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.addressInput}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.sectionContainer}>
        <Grid xs={12} md={5} className={classes.phoneWrapper}>
          Phone
          <br />
          <input
            type="text"
            placeholder="(208) 340-1234"
            name="phone"
            value=""
            // onChange={(e) => onChange(e)}
            className={classes.phoneInput}
          />
        </Grid>
        <Grid xs={12} md={5} className={classes.birthdayWrapper}>
          <BasicDatePicker dateLabel="Birthday" theDate="" />
        </Grid>
        <Grid item xs={12} md={2} className={classes.shirtWrapper}>
          {/* <Paper elevation={0} className={classes.shirtInput}> */}
          Shirt Size
          <br />
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
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Grid container className={classes.sectionContainer}>
          <Grid xs={12} className={classes.nicknameWrapper}>
              Nickname<br/>
            <input
              type="text"
              placeholder="nickname"
              name="nickname"
              value=""
              //   onChange={(e) => onChange(e)}
              className={classes.nicknameInput}
            />
          </Grid>
        </Grid>
    </div>
  );
}
