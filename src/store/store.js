import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";
import mockupsSlice from "./slicers/mockupsSlice";

const rootReducer = combineReducers({
    userSlice,
    mockupsSlice
})
export default configureStore(
    {
        reducer: rootReducer
    }
)