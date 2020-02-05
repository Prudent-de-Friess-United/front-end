import React, {useReducer, useState, useContext, useEffect} from 'react';
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

//props must have a user id to work
const UserInfo = props => {
	const {appState, dispatch} = useContext(AppContext);
	const [user, setUser] = useState('');

	useEffect(() => {
		axiosWithAuth()
			.get(`https://african-market-lambda.herokuapp.com/users/${props.id}`)
			.then(res => {
				console.log('User:', res.data);
			})
			.catch(err => {
				console.log('The data was not returned', err);
			});
		// .finally(console.log('Finally:', items));
	}, []);
	return <> </>;
};
export default UserInfo;
