import React, {useReducer, useContext} from 'react';
import Image from '../images/Home.jpg';
import Container from '@material-ui/core/Container';
import Login from '../components/Login';
//import {styled} from '@material-ui/core/styles';
import styled from 'styled-components';

function Home() {
	const styles = {
		Container: {
			backgroundImage: `url(${Image})`,
			height: `100vh`
		}
	};
	const LoginWrapper = styled.div`
		background-color: rgba(255, 255, 255, 0.8);		
	`;

	return (
		<Container style={styles.Container}>
			<LoginWrapper>
				<Login />
			</LoginWrapper>
		</Container>
	);
}
export default Home;
//rgba(1, 1, 1, 0.2)
