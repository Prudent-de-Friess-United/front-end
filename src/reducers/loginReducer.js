import {LOGINFETCH, LOGINSUCCESS, LOGINFAILURE} from '../actions';

const initialState = {
	loginLoading: false,
	loginSuccess: false,
	user: ''
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGINFETCH:
			return {
				...state,
				loginLoading: true,
				loginSuccess: false
			};
		case LOGINSUCCESS:
			return {
				...state,
				loginLoading: false,
				loginSuccess: true,
				user: action.payload
			};
		case LOGINFAILURE:
			return {
				...state,
				loginLoading: false,
				loginSuccess: false,
				user: ''
			};
		default:
			return state;
	}
};
