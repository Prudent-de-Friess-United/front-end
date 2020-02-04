import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {login} from '../actions/index';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

const Login = props => {
	const [userName, setUserName] = React.useState([]);
	const [password, setPassword] = React.useState([]);

	const localLogin = e => {
		e.preventDefault();
		login(userName, password).then(res => {
			if (res) {
				this.props.history.push(`/user-recipes-list`);
			}
		});
	};
	return (
		<Container>
			<FormControl>
				<TextField
					id="username"
					label="username"
					value={userName}
					onChange={el => {}}
				/>
			</FormControl>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		loginLoading: state.loginLoading,
		loginSuccess: state.loginSuccess,
		user: state.user
	};
};

export default withRouter(connect(mapStateToProps, {login})(Login));
