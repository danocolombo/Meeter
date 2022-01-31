import { Auth } from 'aws-amplify';

export const processLogin = (username, password) => async (dispatch) => {
    try {
        const res = await processUser(username, password);
        if (res) {
            console.log('res:', res);
        } else {
            console.log('nope');
        }
    } catch (error) {
        console.log('error signing in', error);
    }
};
async function processUser(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
}
