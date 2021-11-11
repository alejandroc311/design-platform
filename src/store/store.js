import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";

const rootReducer = combineReducers({
    userSlice
})
export default configureStore(
    {
        reducer: rootReducer
    }
)