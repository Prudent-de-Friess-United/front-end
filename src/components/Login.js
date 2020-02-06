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
import {Typography} from '@material-ui/core';
import { useForm } from 'react-hook-form';

const Login = props => {
	const {appState, dispatch} = useContext(AppContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [department, setDepartment] = useState('');

	const [userValid, setUserValid] = useState(false);
	const [passValid, setPassValid] = useState(false);
	const [valid, setValid] = useState(false);

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
				// if (res.data.user_id) {
				// 	localStorage.setItem('user_id', res.data.user_id);
				// }
				console.log(`login`, res);
				dispatch({type: 'LOGINSUCCESS', payload: res.data});
				console.log(`appState`, appState);
				return true;
			})
			.catch(error => {
				console.log(error);
				dispatch({type: 'LOGINFAILURE'});
			})
			.finally(console.log(appState));
	};

	const handleUsernameChanges = el => {
		setUsername(el.target.value);
		if (el.target.value.length > 1){
			setUserValid(true);			
			if (userValid && passValid){
				setValid(true);
			}
		} else {
			setUserValid(false);
			setValid(false);
		}		
	};
	const handlePasswordChanges = el => {
		setPassword(el.target.value);
		if (el.target.value.length > 5){
			setPassValid(true);
			if (userValid && passValid){
				setValid(true);
			}
		} else {
			setPassValid(false);
			setValid(false);
		}
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
					required
					error={!userValid}
					value={username}					
					onChange={handleUsernameChanges}
				/>
				<TextField
					id="password"
					label="password"
					required
					error={!passValid}
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
				<Button onClick={handleSubmit} disabled={(valid?false:true)}>Submit</Button>
			</FormControl>
			<Container>
				<p>{appState.login.message}</p>
			</Container>
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
