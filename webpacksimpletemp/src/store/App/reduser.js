import { CHANGE_STATE } from "./../constant";

const initialState = {
	test: "состояние по умолчанию"
}


const appReduser = (state=initialState, action) => {
	switch (action.type) {
		case CHANGE_STATE: 
			return {test: action.payload};

		default: 
			return state;
	}
}

export default appReduser; 
