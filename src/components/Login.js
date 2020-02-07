import React, {useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = props => {
	const {appState, dispatch} = useContext(AppContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const [userValid, setUserValid] = useState(true);
	const [passValid, setPassValid] = useState(true);
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
				setTimeout(function(){
					props.history.push('/user-home');
				}, 1000)
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
		if (el.target.value.length > 2) {
			setUserValid(true);
			if (userValid && passValid) {
				setValid(true);
			}
		} else {
			setUserValid(false);
			setValid(false);
		}
	};
	const handlePasswordChanges = el => {
		setPassword(el.target.value);
		if (el.target.value.length > 5) {
			setPassValid(true);
			if (userValid && passValid) {
				setValid(true);
			}
		} else {
			setPassValid(false);
			setValid(false);
		}
	};
	
	return (
		<Container>
			<Typography component="h2">Welcome to Africa Connected!</Typography>
			<FormControl onSubmit={el => handleSubmit(el)}>
				<TextField
					id="username"
					label="username"
					required
					error={!userValid}
					value={username}
					onChange={handleUsernameChanges}
					helperText={(userValid ? "" : "Must be at least three characters long")}
					color="white"
				/>
				<TextField
					id="password"
					label="password"
					required
					error={!passValid}
					value={password}
					onChange={handlePasswordChanges}
					helperText={(passValid ? "" : "Must be at least six characters long")}
				/>
				{appState.login.loading ? (
					<CircularProgress />
				) : (
					<Button color="white" onClick={handleSubmit} disabled={valid ? false : true}>
						Submit
					</Button>
				)}
			</FormControl>
			<Container>
				<p>{appState.login.message}</p>
			</Container>
		</Container>
	);
};

export default Login;
