import axios from "axios";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  SET_ACTIVES,
  SET_MTG_CONFIGS,
  SET_DEFAULT_GROUPS,
  SET_CLIENT_USERS,
  SET_CLIENT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

import UserPool from "./UserPool";

// import { CollectionsOutlined, DateRange } from '@material-ui/icons';

// Login (Authenticate)
//============================

export const login = (email, password) => async (dispatch) => {
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool,
  });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  // try to authenticate....
  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      const jwToken = data.idToken.jwtToken;
      data.token = jwToken;
      let login_success_data = {
        token: data.token,
      };
      //pass the jwt to LOGIN_SUCCESS
      //save token in redux
      dispatch({
        type: LOGIN_SUCCESS,
        payload: login_success_data,
      });
      //======================================
      // now lets get our user information
      // from Cognito, send to loadUser
      let uData = {
        _id: data.idToken.payload.sub,
        email: data.idToken.payload.email,
        firstName: data.idToken.payload.given_name,
        lastName: data.idToken.payload.family_name,
        phone: data.idToken.payload.phone_number,
      };
      //----------------------------------------
      // take the info known and then continue
      // loading user info by calling the
      // function lower in this file.
      //----------------------------------------
      dispatch(loadUser({ uData }));
    },
    onFailure: (err) => {
      console.error("onFailure:", err);
      const util = require("util");
      console.log(
        "err: " + util.inspect(err, { showHidden: false, depth: null })
      );

      dispatch(setAlert(err.message, "danger"));
      dispatch({
        type: LOGIN_FAIL,
      });
    },
    // newPasswordRequired: (data) => {
    //     console.log('newPasswordRequired:', data);
    // },
  });
};

// Load Client
//---------------------------------------------------
// this funciton saves the client configs and gets
// the default groups.  This replaced the original
// loadSystem
//----------------------------------------------------
export const loadClient = (cid) => async (dispatch) => {
  try {
    // get the client info from database
    let client = cid.theClient;
    const config = {
      headers: {
        "Access-Control-Allow-Headers":
          "Content-Type, x-auth-token, Access-Control-Allow-Headers",
        "Content-Type": "application/json",
      },
    };
    let obj1 = {
      operation: "getClientInfo",
      payload: {
        clientId: client,
      },
    };
    let body = JSON.stringify(obj1);

    let api2use = process.env.REACT_APP_MEETER_API + "/clients";
    let res = null;
    try {
      res = await axios.post(api2use, body, config).catch((err) => {
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        throw err;
      });
    } catch (err) {
      console.log("logoin.js - loadClient: getClientInfo failed");
    }
    if (res.status === 200) {
      dispatch({
        type: SET_CLIENT,
        payload: res.data.body,
      });
      // need to check if we got any body, then define the
      // defaultGroups and the configs.
      if (Object.keys(res.data.body).length > 0) {
        let clientInfo = res.data.body.Items[0];
        //confirm we have defaultGroups and save
        if (clientInfo.hasOwnProperty("defaultGroups")) {
          dispatch({
            type: SET_DEFAULT_GROUPS,
            payload: clientInfo.defaultGroups,
          });
        }
        if (clientInfo.hasOwnProperty("clientConfigs")) {
          dispatch({
            type: SET_MTG_CONFIGS,
            payload: clientInfo.clientConfigs,
          });
        }
        if (clientInfo.hasOwnProperty("clientUsers")) {
          dispatch({
            type: SET_CLIENT_USERS,
            payload: clientInfo.clientUsers,
          });
        }
      } else {
        console.log("NO RESPONSE DATA");
      }
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//----------------------------------------------------------
// Load User
// called from the function above login, upon success
//----------------------------------------------------------
export const loadUser = (userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Access-Control-Allow-Headers":
          "Content-Type, x-auth-token, Access-Control-Allow-Headers",
        "Content-Type": "application/json",
      },
    };
    // take the _id value and get user from meeter API
    let sub = userId.uData._id;
    let obj = { operation: "authenticate", payload: { uid: sub } };
    const body = JSON.stringify(obj);

    const api2use = process.env.REACT_APP_MEETER_API + "/user";
    const res = await axios.post(api2use, body, config);

    // now add response data location: res.data.body.x values
    // to the values already passed in from login (cognito)
    let user_data = {
      _id: userId.uData._id,
      firstName: userId.uData.firstName,
      lastName: userId.uData.lastName,
      email: userId.uData.email,
      phone: userId.uData.phone,
      defaultClient: res.data.body.defaultClient,
      defaultClientId: res.data.body.defaultClientId,
      defaultClientRole: res.data.body.role,
      defaultClientStatus: res.data.body.status,
    };
    let active_data = {
      client: res.data.body.defaultClient,
      clientId: res.data.body.defaultClientId,
      role: res.data.body.role,
      status: res.data.body.status,
    };
    // this next dispatch does nothing...??
    dispatch({
      type: SET_ACTIVES,
      payload: active_data,
    });
    dispatch({
      type: USER_LOADED,
      payload: user_data,
    });

    let theClient = res.data.body.defaultClient;
    //---------------------------------------
    // now go get defaultGroups and configs
    //---------------------------------------
    dispatch(loadClient({ theClient }));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    //-----------------------------------------------------
    // new function to use cognito
    //-----------------------------------------------------
    let poolData = {
      UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
      ClientId: process.env.REACT_APP_COGNITO_CLIENTID,

      // values before are the test cognito pool
      //   UserPoolId: "us-east-1_4UwI8s8MM",
      //   ClientId: "5j6s4cvhqj0nm3k6qn73j4humt",
    };
    let userPool = new CognitoUserPool(poolData);

    // let attributeList = [];
    // let dataEmail = {
    //     Name: 'email',
    //     Value: email,
    // };
    // // we don't require phone number when first registering, but
    // // cognito requires, so we set generic value
    // // let dataPhoneNumber = {
    // //     Name: 'phone_number',
    // //     Value: '+15555555555',
    // // };
    // let attributeEmail = new CognitoUserAttribute(dataEmail);
    // let attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    // attributeList.push(attributeEmail);
    // attributeList.push(attributePhoneNumber);
    let attributeList = [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "phone_number",
        Value: "+15555555555",
      },
      {
        Name: "nickname",
        Value: "NICKNAME",
      },
      {
        Name: "address",
        Value: "ADDRESS",
      },
      {
        Name: "birthdate",
        Value: "09/10/1963",
      },
      {
        Name: "family_name",
        Value: "LAST_NAME",
      },
      {
        Name: "gender",
        Value: "GENDER",
      },
      {
        Name: "given_name",
        Value: "GIVEN_NAME",
      },
      {
          Name: "preferred_username",
          Value: "PREFERRED_USERNAME",
      },
    ];
    // var params2 = {
    //   ClientId: "5j6s4cvhqj0nm3k6qn73j4humt" /* required */,
    //   Password: password /* required */,
    //   Username: name /* required */,
    //   UserAttributes: [
    //     {
    //       Name: "custom:clientId" /* required */,
    //       Value: "TBD",
    //     },
    //     /* more items */
    //   ],
    //   ValidationData: [
    //     {
    //       Name: "email" /* required */,
    //       Value: email,
    //     },
    //     /* more items */
    //   ],
    // };
    // const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

    // client.signUp(params2, function (err, data) {
    //   if (err) console.log(err, err.stack);
    //   // an error occurred
    //   else console.log(data); // successful response
    // });
    // let params = {
    //   Username: email,
    //   Password: password,
    //   email: email,
    //   phone_number: "+15555555555",
    //   UserAttributes: [
    //     {
    //       Name: "custom:clientId" /* required */,
    //       Value: "TBD",
    //     },
    //   ],
    // };
    // userPool.signUp(params, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else     console.log(data);           // successful response
    //   });

    // userPool.signUp(params, function(
    // userPool.signUp(email, password, attributeList, null, function(
    // userPool.signUp(params2, function(
    // let attList = {
    //   phone_number: "+11234567890",
    //   email: email,
    //   preferred_username: email,
    //   UserAttributes: [
    //     {
    //       Name: "clientId" /* required */,
    //       Value: "TBD",
    //     },
    //   ],
    // };
    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        alert("user name is " + cognitoUser.getUsername());
        console.log("user name is " + cognitoUser.getUsername());
      }
    );
  };
export const OLDregister =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
