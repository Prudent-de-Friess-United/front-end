import React from 'react';
import {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import AppContext from '../contexts/AppContext';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// export const REGISTRATION_START = 'REGISTRATION_START';
// export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
// export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

//from my action file RIP

// console.log(addUser);
// 	dispatch({type: REGISTRATION_START});
// 	axiosWithAuth()
// 		.post(`/auth/register`, addUser)
// 		.then(res => {
// 			console.log(res);
// 			localStorage.setItem('token', res.data.token);
// 			dispatch({type: REGISTRATION_SUCCESS, payload: res.data});
// 			return true;
// 		})
// 		.catch(error => {
// 			console.log(error.response);
// 			dispatch({type: REGISTRATION_FAILURE, payload: error.response});
// 		});
// };

function Signup() {
	const {appState, dispatch} = useContext(AppContext);
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('buyer');

    const [userValid, setUserValid] = useState(false);
	const [passValid, setPassValid] = useState(false);
	const [valid, setValid] = useState(false);

    const handleUsernameChanges = event => {
        setUsername(event.target.value);
        if (event.target.value.length > 1){
			setUserValid(true);			
			if (userValid && passValid){
				setValid(true);
			}
		} else {
			setUserValid(false);
			setValid(false);
		}	
    };
    const handlePasswordChanges = event => {
        setPassword(event.target.value);
        if (event.target.value.length > 5){
			setPassValid(true);
			if (userValid && passValid){
				setValid(true);
			}
		} else {
			setPassValid(false);
			setValid(false);
		}
    };
    const handleDepartmentChange = event => {
        setDepartment(event.target.value);
    };
	    
    const handleSubmit = event => {
        event.preventDefault();
        dispatch({type: 'SIGNUP'})
        axiosWithAuth()
            .post('/auth/register', {
                username: username,
                password: password,
                department: department
            })
            .then(res => {
                console.log('Response', res)
            })
            .catch(error => {
                console.log(error);
            })
    }

	return (
		<Container>
			<FormControl onSubmit={event => handleSubmit(event)}>
                <TextField 
                    id="username" 
                    label="Username"
                    required
                    error={!userValid}
                    value={username}
                    onChange={handleUsernameChanges}
                />
                <TextField 
                    id="password" 
                    label="Password"
                    required
                    error={!passValid}
                    value={password}
                    onChange={handlePasswordChanges}
                />
				<FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup aria-label='department' name='department' value={department} onChange={handleDepartmentChange}>
                    <FormControlLabel value='buyer' control={<Radio />} label="Buyer" />
                    <FormControlLabel value='seller' control={<Radio />} label="Seller" />
                </RadioGroup>                    
                <Button onClick={handleSubmit} disabled={(valid?false:true)}>Submit</Button>
            </FormControl>
        </Container>
	);
}

export default Signup;
