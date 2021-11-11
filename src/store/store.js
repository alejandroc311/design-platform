import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";

const rootReducer = {
    userSlice
}
export default configureStore(
    {
        reducer: combineReducers(rootReducer)
    }
)