import React, {useReducer, useState, useContext} from 'react';
// import Link from "@material-ui/core/Link";
import {Link} from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function Navbar() {
	const {appState, dispatch} = useContext(AppContext);
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/sign-up">Sign-Up</Link>
			<Link to="/sign-in">Log In</Link>
		</nav>
	);
}

export default Navbar;
