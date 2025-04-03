import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import axios from 'axios';

export const login = (dispatch, credentials) => {
    dispatch(loginStart());
    axios
        .post('/api/auth/login', credentials)
        .then((response) => {
            dispatch(loginSuccess(response.data));
        })
        .catch((error) => {
            dispatch(loginFailure(error.response.data));
        });
};

export const signup = (dispatch, userData) => {
    dispatch(loginStart());
    axios
        .post('/api/auth/signup', userData)
        .then((response) => {
            dispatch(loginSuccess(response.data));
        })
        .catch((error) => {
            dispatch(loginFailure(error.response.data));
        });
};
