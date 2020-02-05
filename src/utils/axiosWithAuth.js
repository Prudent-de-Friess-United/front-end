import axios from 'axios';

export const axiosWithAuth = () => {
	return axios.create({
		baseURL: 'https://african-market-lambda.herokuapp.com/',
		headers: {
			Authorization: localStorage.getItem('token')
		}
	});
};
