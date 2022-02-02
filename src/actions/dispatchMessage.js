import { setAlert } from './alert';
export const dispatchThis = (displayMessage, color) => async (dispatch) => {
    let alertColor = null;
    if (color === 'green') {
        alertColor = 'success';
    }
    if (color === 'red') {
        alertColor = 'danger';
    }
    dispatch(setAlert(displayMessage, alertColor));
};
