import React, {useReducer, useContext} from 'react';
import Image from '../images/Home.jpg';
import Container from '@material-ui/core/Container';
import Login from './Login';
//import {styled} from '@material-ui/core/styles';
import styled from 'styled-components';

function HomeLogin() {
	const styles = {
		Container: {
			backgroundImage: `url(${Image})`,
			height: `100vh`
		}
	};
	const LoginWrapper = styled.div`
		background-color: rgba(1, 1, 1, 0.5);
		color: white;
	`;

	return (
		<Container style={styles.Container}>
			<LoginWrapper>
				<Login />
			</LoginWrapper>
		</Container>
	);
}
export default HomeLogin;
//rgba(1, 1, 1, 0.2)
