import { CHANGE_STATE } from "./constant";
import  appReducer  from "./App/reduser";
import { combineReducers } from "redux";



const mainReduser = combineReducers(
	{appReducer: appReducer,
		oneMorereducer: (state={}, app) => state}
	);

export default mainReduser; 