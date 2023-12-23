// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import chattingReducer from "./chattingReducer";
export let rootReducer = combineReducers({
    authUser: authUserReducer,
    chatting: chattingReducer,
});

export default rootReducer;
