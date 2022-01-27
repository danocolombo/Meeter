//=======================================
// this is login pre-amplify. This does get JWT
//=======================================

import React, { Fragment, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import {
  CognitoIdentityProviderClient,
  CognitoIdentityProvider,
} from "@aws-sdk/client-cognito-identity-provider";

//import { login } from '../../actions/auth';
//import { login } from '../../actions/login';
import crypto from "crypto";
import UserPool from "../../actions/UserPool";

const Login = ({ login, isAuthenticated }) => {
  // const meeter_id = process.env.MEETER_COGNITO_APPID;
  // console.log('meeter_id:' + meeter_id);
  const thisVersion = process.env.REACT_APP_MEETER_VERSION;
  // console.log(process.env);
  // const [formData, setFormData] = useState({
  //     email: '',
  //     password: '',
  // });
  const history = useHistory();
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn1 = async (dispatch) => {
    const clientId = process.env.REACT_APP_COGNITO_CLIENTID;
    const clientSecret = process.env.REACT_APP_COGNITO_CLIENT_SECRET;

    (async () => {
      var params = {
        ClientId: clientId,
        Password: password,
        Username: username,
        SecretHash: hashSecret(clientSecret, username, clientId),
      };
      let res = null;
      const provider = new CognitoIdentityProvider({ region: "us-east-1" });
      try {
        res = await provider.signIn(params);
        const util = require("util");
        console.log(
          "res:  \n" + util.inspect(res, { showHidden: false, depth: null })
        );
      } catch (e) {
        const util = require("util");
        console.log(
          "e:  \n" + util.inspect(e, { showHidden: false, depth: null })
        );
        switch (e.name) {
          case "UsernameExistsException":
            dispatch(setAlert(e.message, "danger"));
            break;

          default:
            console.log("DEFAULT was caught");
            dispatch(setAlert(e.message, "danger"));
            break;
        }
      }
    })();
  };

  //   ++++++++++++++++++++++++++++++++++++
  //   Meeter 6.0 login
  //   ++++++++++++++++++++++++++++++++++++
  const signIn = async (dispatch) => {
    let userInfo = {};
    const clientId = process.env.REACT_APP_COGNITO_CLIENTID_NO_SECRET;
    const userPoolId = process.env.REACT_APP_COGNITO_USERPOOLID;
    
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId,
    });
    
    let userData = {
      Username: username,
      Pool: userPool,
      //SecretHash: hashSecret(clientSecret, username, clientId),
    };
    let cognitoUser = new CognitoUser(userData);
    let userAuth = {
      Username: username,
      Password: password,
      //SecretHash: hashSecret(clientSecret, username, clientId),
    };
    let authenticationDetails = new AuthenticationDetails(userAuth);
    try {
        cognitoUser.authenticateUser(authenticationDetails, {
          //   cognito callbacks
            onSuccess: function (result) {
              // we got the token back
              // let accessToken = result.getAccessToken().getJwtToken();
              userInfo.token = result.getAccessToken().getJwtToken();


              console.log(userInfo.token);
            },
            onFailure: function (err) {
                switch (err.code) {
                    case "UserNotConfirmedException":
                        console.log('Account not confirmed.');
                        break;
                    case "NotAuthorizedException":
                        console.log('Incrrect username or password');
                        break;
                    default:
                        break;
                }
              console.log(err);
            },
          });
    } catch (error) {
        console.log('we threw attempting to authenticateUser');
    }
    //   ==================================
    //   auth confirmed proceed with user
    //   ==================================
    let currentUserInfo = {};
    let currentSession = {};
    
    
  };
  function hashSecret(clientSecret, username, clientId) {
    return crypto
      .createHmac('SHA256', clientSecret)
      .update(username + clientId)
      .digest('base64')
  }

  function getPoolData() {
    return {
      UserPoolId: "us-east-1_Dec2fuIsX",
      ClientId: "1f39ji5mf40fvg4atstv0uldqo",
    };
  }

  if (isAuthenticated) {
    //-----------------------------------------------------
    // if the user is authenticated, redirect to dashboard
    // otherwise stay on login page, error if necessary
    //-----------------------------------------------------
    return <Redirect to="/dashboard" />;
  }
  function hashSecret(clientSecret, username, clientId) {
    return crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Address"
            name="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
          />
        </div>
        <input
          type="button"
          onClick={signIn}
          className="btn btn-primary"
          value="Login"
        />
      </div>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <div className="appVersion">build: {thisVersion}</div>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
