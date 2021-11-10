import { configureStore, combineReducers } from "@reduxjs/toolkit";
function reducers (state = {}, action){
    return state
}
const rootReducer = {
    reducers
}
export default configureStore(
    {reducer: combineReducers(rootReducer)}
)