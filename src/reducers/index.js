export const initialState = {
	login: {
		loginLoading: false,
		loginSuccess: false,
		user_id: '',
		message: ''
	},
	itemsUpdated: {
		addingItemLoading: false,
		addingItemSuccess: false
	}
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGINFETCH':
			return {
				...state,
				login: {
					...state,
					loginLoading: true,
					loginSuccess: false
				}
			};
		case 'LOGINSUCCESS':
			return {
				...state,
				login: {
					...state,
					loginLoading: false,
					loginSuccess: true,
					user_id: action.payload.id,
					message: action.payload.message
				}
			};
		case 'LOGINFAILURE':
			return {
				...state,
				login: {
					loginLoading: false,
					loginSuccess: false,
					user: '',
					message: ''
				}
			};
		case 'ADDITEM':
			return {
				...state,
				itemsUpdated: {
					addingItemLoading: true,
					addingItemSuccess: false
				}
			};
		case 'ADDITEMSUCCESS':
			return {
				...state,
				itemsUpdated: {
					addingItemLoading: false,
					addingItemSuccess: true
				}
			};
		case 'RESET':
			return {
				...state,
				itemsUpdated: {
					addingItemLoading: false,
					addingItemSuccess: false
				}
			};
		default:
			return state;
	}
};
