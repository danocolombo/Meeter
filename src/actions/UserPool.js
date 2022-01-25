import { CognitoUserPool } from 'amazon-cognito-identity-js';
// this is provided to give access to call AWS authentication via Cognito
const poolData = {
    // this information defines the Amazon cognito user pool definitions
    // cognito user pool: Meeter
    // UserPoolId: 'us-east-1_ekSObpH41',
    // ClientId: '2qaroev40htl0fdsc1ccr8194v',

    // cognito user poole: MeeterCognito
    // UserPoolId: 'us-east-1_Dec2fuIsX',
    // ClientId: '1f39ji5mf40fvg4atstv0uldqo',

    // get the cognito values from .env
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
};
// const UserPool = new CognitoUserPool(poolData);

export default new CognitoUserPool(poolData);
