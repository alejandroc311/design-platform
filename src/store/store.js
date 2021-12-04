import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";
import mockupsSlice from "./slicers/mockupsSlice";
import sessionSlice from "./slicers/sessionSlice";
const rootReducer = combineReducers({
    userSlice,
    mockupsSlice, 
    sessionSlice
});
export default configureStore(
    {
        reducer: rootReducer
    }
);