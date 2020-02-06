import React, {useReducer, useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import ItemList from '../components/ItemList';
import {Container, Typography} from '@material-ui/core';
import styled from 'styled-components';
import MyItems from '../components/MyItems';
import Login from '../components/Login';

const LandingWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-context: space-between;
`;

function Landing() {
	const {appState, dispatch} = useContext(AppContext);
	return (
		<Container>
			{appState.login.loginSuccess ? (
				<Typography component="h2">{appState.login.message}</Typography>
			) : (
				<Login />
			) // <Typography>To post please login</Typography>
			}
			<LandingWrapper>
				<ItemList />
				{appState.login.loginSuccess && <MyItems />}
			</LandingWrapper>
		</Container>
	);
}

export default Landing;
