import { CognitoUserPool } from 'amazon-cognito-identity-js';
// this is provided to give access to call AWS authentication via Cognito
const poolData = {
    // this information defines the Amazon cognito user pool definitions
    UserPoolId: 'us-east-1_ekSObpH41',
    ClientId: '25gavn3c4tkbas0gov5onmdta4',
};
// const UserPool = new CognitoUserPool(poolData);

export default new CognitoUserPool(poolData);
