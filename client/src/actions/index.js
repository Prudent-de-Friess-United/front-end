import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth';
//LOGGIN
export const LOGINFETCH = 'LOGINFETCH';
export const LOGINSUCCESS = 'LOGINSUCCESS';
export const LOGINFAILURE = 'LOGINFAILURE';
//
// {
// 	"username" : "bob",
//     "password" : "password",
//     "department" : "seller"
// }

//type must be either buyer or seller
export const login = (username, password, department) => dispatch => {
	dispatch({type: LOGINFETCH});
	return axiosWithAuth()
		.post('/auth/login', {
			username: username,
			password: password,
			department: department
		})
		.then(res => {
			localStorage.setItem('token', res.data.token);
			if (res.data.user_id) {
				localStorage.setItem('user_id', res.data.user_id);
			}
			dispatch({type: LOGINSUCCESS, payload: res.data});
			return true;
		})
		.catch(error => {
			dispatch({type: LOGINFAILURE, payload: error.response});
		});
};

//REGISTRATION

export const REGISTRATION_START = 'REGISTRATION_START';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const addUser = addUser => dispatch => {
	console.log(addUser);
	dispatch({type: REGISTRATION_START});
	axiosWithAuth()
		.post(`/auth/register`, addUser)
		.then(res => {
			console.log(res);
			localStorage.setItem('token', res.data.token);
			dispatch({type: REGISTRATION_SUCCESS, payload: res.data});
			return true;
		})
		.catch(error => {
			console.log(error.response);
			dispatch({type: REGISTRATION_FAILURE, payload: error.response});
		});
};
