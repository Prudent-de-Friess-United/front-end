import React, {useReducer, useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {Link, withRouter, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const Login = props => {
	const {appState, dispatch} = useContext(AppContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [department, setDepartment] = useState('');

	//I need to but message from request into state

	const handleSubmit = el => {
		el.preventDefault();
		dispatch({type: 'LOGINFETCH'});
		axiosWithAuth()
			.post('/auth/login', {
				username: username,
				password: password,
				department: 'seller'
				// department: department
			})
			.then(res => {
				localStorage.setItem('token', res.data.token);
				if (res.data.user_id) {
					localStorage.setItem('user_id', res.data.user_id);
				}
				console.log(res);
				dispatch({type: 'LOGINSUCCESS', payload: res.data});
				return true;
			})
			.catch(error => {
				console.log(error);
				dispatch({type: 'LOGINFAILURE'});
			});
	};

	const handleUsernameChanges = el => {
		setUsername(el.target.value);
	};
	const handlePasswordChanges = el => {
		setPassword(el.target.value);
	};
	const handleDepartmentChanges = el => {
		setDepartment(el.target.value);
	};

	return (
		<Container>
			<FormControl onSubmit={el => handleSubmit(el)}>
				<TextField
					id="username"
					label="username"
					value={username}
					onChange={handleUsernameChanges}
				/>
				<TextField
					id="password"
					label="password"
					value={password}
					onChange={handlePasswordChanges}
				/>
				{/* <InputLabel id="department"> Account Type </InputLabel> */}
				{/* <Select
					id="department"
					multiple
					value={department}
					onChange={handleDepartmentChanges}
				>
					<MenuItem value={'buyer'}>Buyer</MenuItem>
					<MenuItem value={'seller'}>Seller</MenuItem>
				</Select> */}
				<Button onClick={handleSubmit}>Submit</Button>
			</FormControl>
		</Container>
	);
};

export default Login;

//ACTION MADDNESS
// //LOGGIN
// export const LOGINFETCH = 'LOGINFETCH';
// export const LOGINSUCCESS = 'LOGINSUCCESS';
// export const LOGINFAILURE = 'LOGINFAILURE';
// //
// // {
// // 	"username" : "bob",
// //     "password" : "password",
// //     "department" : "seller"
// // }

// //type must be either buyer or seller
// export const login = (username, password, department) => dispatch => {
// 	dispatch({type: LOGINFETCH});
// 	return axiosWithAuth()
// 		.post('/auth/login', {
// 			username: username,
// 			password: password,
// 			department: department
// 		})
// 		.then(res => {
// 			localStorage.setItem('token', res.data.token);
// 			if (res.data.user_id) {
// 				localStorage.setItem('user_id', res.data.user_id);
// 			}
// 			dispatch({type: LOGINSUCCESS, payload: res.data});
// 			return true;
// 		})
// 		.catch(error => {
// 			dispatch({type: LOGINFAILURE, payload: error.response});
// 		});
// };
