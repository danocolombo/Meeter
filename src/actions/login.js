import axios from "axios";
import {
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { setAlert } from "./alert";
import {
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
import crypto from 'crypto';
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
export const register = (theRequest) => async (dispatch) => {
  //==========================================
  // flush the request to variables
  //==========================================
  // required
  let firstName = theRequest.firstName;
  let lastName = theRequest.lastName;
  let gender = theRequest.gender;
  let email = theRequest.email;
  let password = theRequest.password;
  let preferred_username = theRequest.preferred_username;
  //----------------------------------------
  // optional reg info
  let userName = null;
  let address = null;
  let phone = null;
  let birthday = null;
  let shirt = null;

  //now see if there is other registration info provided
  if (theRequest?.userName) {
    userName = theRequest.userName;
  }
  if (theRequest?.address) {
    address = theRequest.address;
  }
  if (theRequest?.phone) {
    phone = theRequest.phone;
  }
  if (theRequest?.birthday) {
    birthday = theRequest.birthday;
  }
  if (theRequest?.shirt) {
    shirt = theRequest.shirt;
  }
  //   build attributeList
  let attributeList = [
    {
      Name: "given_name",
      Value: firstName,
    },
    {
      Name: "family_name",
      Value: lastName,
    },
    {
      Name: "gender",
      Value: gender,
    },
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "preferred_username",
      Value: preferred_username,
    },
  ];
  //   add optional reg info
  if (address) {
    attributeList.push({ Name: "address", Value: address });
  }
  if (phone) {
    attributeList.push({ Name: "phone", Value: phone });
  }
  if (birthday) {
    attributeList.push({ Name: "birthday", Value: birthday });
  }
  //    this is new code
  var originalParams = {
    ClientId:
      process.env.REACT_APP_COGNITO_CLIENTID /* 'STRING_VALUE', /* required */,
    Password: password /* 'STRING_VALUE', /* required */,
    Username: "dcolombo" /* 'STRING_VALUE', /* required */,

    SecretHash: "5dDa/mgbrIIaOdAet+xIJIJEOIh8+iZWSjL7fZrh+S0=",
    UserAttributes: attributeList,
    ValidationData: [
      {
        Name: "email" /* 'STRING_VALUE', /* required */,
        Value: email,
      },
      /* more items */
    ],
  };
  
  const clientId = process.env.REACT_APP_COGNITO_CLIENTID;
  const clientSecret = process.env.REACT_APP_COGNITO_CLIENT_SECRET;

  (async () => {
    var params = {
      ClientId: clientId,
      Password: password,
      Username: userName,
      
      //SecretHash: hashSecret(clientSecret, userName, clientId),
      UserAttributes: [
        {
          Name: 'given_name',
          Value: firstName,
        },
        {
          Name: 'gender',
          Value: gender,
        },
        {
          Name: 'family_name',
          Value: lastName,
        },
        { Name: 'email',
          Value: email,
        }
      ],
    }
    let res = null;
    const provider = new CognitoIdentityProvider({ region: 'us-east-1' })
    try {
      res = await provider.signUp(params)
      const util = require('util');
      console.log('res:  \n' + util.inspect(res, { showHidden: false, depth: null }));
      
    } catch (e) {
      const util = require('util');
      console.log('e:  \n' + util.inspect(e, { showHidden: false, depth: null }));
      switch (e.name) {
        case "UsernameExistsException":
          dispatch(setAlert(e.message, "danger"));
          break;
      
        default:
          console.log('DEFAULT was caught');
          dispatch(setAlert(e.message, "danger"));
          break;
      }
      console.log('\nvvvvvvvvvvvvvvvvvvvvvvv\nSignup fail. Error: ', e)
    }
  })();
  
}
function hashSecret(clientSecret, username, clientId) {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64')
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
