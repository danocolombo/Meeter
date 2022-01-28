import axios from "axios";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
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
import crypto from "crypto";
import UserPool from "./UserPool";

export const processLogin = (username, password) => async (dispatch) => {
  const COG_CLIENTID = process.env.REACT_APP_COGNITO_CLIENTID;
  const COG_SECRET = process.env.REACT_APP_COGNITO_CLIENT_SECRET;
  // create a cognitoUser to get the details of user from pool.
  const cogUser = new CognitoUser({
    Username: username,
    Pool: UserPool,
  });
  // get the session details
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
    // SecretHash: hashSecret(COG_SECRET, username, COG_CLIENTID)
  });
  //   give the default a try...
  var authenticationDataX = {
    Username: "fguru",
    Password: "R0mans1212!",
  };
  var authenticationDetailsX = new AuthenticationDetails(
    authenticationDataX
  );
  var poolDataX = {
    UserPoolId: "us-east-1_MviuK2vFY",
    ClientId: "521ktk6vc6v3ddj8gh6qicnblt",
  };
  var userPoolX = new CognitoUserPool(poolDataX);
  var userDataX = {
    Username: "username",
    Pool: userPoolX,
  };

  var cognitoUserX = new CognitoUser(userDataX);
  cognitoUserX.authenticateUser(authenticationDetailsX, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();

      /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
      var idToken = result.idToken.jwtToken;
    },

    onFailure: function (err) {
      alert(err);
    },
  });
  //   END sample
  // try to authenticate....
  try {
    cogUser.authenticateUser(authDetails, {
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
          username: data.idToken.payload.username,
          email: data.idToken.payload.email,
          firstName: data.idToken.payload.given_name,
          lastName: data.idToken.payload.family_name,
          gender: data.idToken.payload.gender,
        };
        //----------------------------------------
        // take the info known and then continue
        // loading user
        //----------------------------------------
        //   LOAD USER
        //   ======================
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
          let sub = uData._id;
          let obj = { operation: "authenticate", payload: { uid: sub } };
          const body = JSON.stringify(obj);

          const api2use = process.env.REACT_APP_MEETER_API + "/user";
          let authResponse = null;
          axios
            .post(api2use, body, config)
            .then((response) => {
              authResponse = response;
            })
            .catch((e) => {
              dispatch(setAlert(e.message, "danger"));
              dispatch({ type: LOGIN_FAIL });
            });

          // const res = await axios.post(api2use, body, config);

          // now add response data location: res.data.body.x values
          // to the values already passed in from login (cognito)
          let user_data = {
            _id: uData._id,
            username: username,
            firstName: uData.firstName,
            lastName: uData.lastName,
            email: uData.email,
            gender: uData.gender,
            defaultClient: authResponse.data.body.defaultClient,
            defaultClientId: authResponse.data.body.defaultClientId,
            defaultClientRole: authResponse.data.body.role,
            defaultClientStatus: authResponse.data.body.status,
          };
          let active_data = {
            client: authResponse.data.body.defaultClient,
            clientId: authResponse.data.body.defaultClientId,
            role: authResponse.data.body.role,
            status: authResponse.data.body.status,
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

          let theClient = authResponse.data.body.defaultClient;
          //---------------------------------------
          // now go get defaultGroups and configs
          //---------------------------------------
          //   LOAD CLIENT
          //   ===================
          try {
            // get the client info from database
            let client = theClient;
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
            let clientInfoRes = null;
            axios
              .post(api2use, body, config)
              .then((response) => {
                clientInfoRes = response;
              })
              .catch((e) => {
                if (e.response.status === 404) {
                  throw new Error(`${e.config.url} not found`);
                  throw e;
                }
                dispatch({
                  type: AUTH_ERROR,
                });
              });
            if (clientInfoRes.status === 200) {
              dispatch({
                type: SET_CLIENT,
                payload: clientInfoRes.data.body,
              });
              // need to check if we got any body, then define the
              // defaultGroups and the configs.
              if (Object.keys(clientInfoRes.data.body).length > 0) {
                let clientInfo = clientInfoRes.data.body.Items[0];
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
                dispatch({
                  type: AUTH_ERROR,
                });
              }
            }
          } catch (err) {
            dispatch({
              type: AUTH_ERROR,
            });
          }
        } catch (err) {
          dispatch({
            type: AUTH_ERROR,
          });
        }
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
    console.log("how did we get here??");
  } catch (error) {
    console.log("Meeter6:ERROR - ", error);
  }
};
// // Register User
// export const register = (theRequest) => async (dispatch) => {
//     //==========================================
//     // flush the request to variables
//     //==========================================
//     // required
//     let firstName = theRequest.firstName;
//     let lastName = theRequest.lastName;
//     let gender = theRequest.gender;
//     let email = theRequest.email;
//     let password = theRequest.password;
//     let preferred_username = theRequest.preferred_username;
//     //----------------------------------------
//     // optional reg info
//     let userName = null;
//     let address = null;
//     let phone = null;
//     let birthday = null;
//     let shirt = null;

//     //now see if there is other registration info provided
//     if (theRequest?.userName) {
//       userName = theRequest.userName;
//     }
//     if (theRequest?.address) {
//       address = theRequest.address;
//     }
//     if (theRequest?.phone) {
//       phone = theRequest.phone;
//     }
//     if (theRequest?.birthday) {
//       birthday = theRequest.birthday;
//     }
//     if (theRequest?.shirt) {
//       shirt = theRequest.shirt;
//     }
//     //   build attributeList
//     let attributeList = [
//       {
//         Name: "given_name",
//         Value: firstName,
//       },
//       {
//         Name: "family_name",
//         Value: lastName,
//       },
//       {
//         Name: "gender",
//         Value: gender,
//       },
//       {
//         Name: "email",
//         Value: email,
//       },
//       {
//         Name: "preferred_username",
//         Value: preferred_username,
//       },
//     ];
//     //   add optional reg info
//     if (address) {
//       attributeList.push({ Name: "address", Value: address });
//     }
//     if (phone) {
//       attributeList.push({ Name: "phone", Value: phone });
//     }
//     if (birthday) {
//       attributeList.push({ Name: "birthday", Value: birthday });
//     }
//     //    this is new code
//     var originalParams = {
//       ClientId:
//         process.env.REACT_APP_COGNITO_CLIENTID /* 'STRING_VALUE', /* required */,
//       Password: password /* 'STRING_VALUE', /* required */,
//       Username: "dcolombo" /* 'STRING_VALUE', /* required */,

//       SecretHash: "5dDa/mgbrIIaOdAet+xIJIJEOIh8+iZWSjL7fZrh+S0=",
//       UserAttributes: attributeList,
//       ValidationData: [
//         {
//           Name: "email" /* 'STRING_VALUE', /* required */,
//           Value: email,
//         },
//         /* more items */
//       ],
//     };

function hashSecret(clientSecret, username, clientId) {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}
