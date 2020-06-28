import { CHANGE_STATE } from "./constant";

export const actionMain = (payload) => 
	({
	    type: CHANGE_STATE,
	    payload: payload
	});


