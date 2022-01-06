import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./slicers/adminSlice";
import userSlice from "./slicers/userSlice";
import mockupsSlice from "./slicers/mockupsSlice";
import sessionSlice from "./slicers/sessionSlice";
import commentsSlice from "./slicers/commentsSlice";
const rootReducer = combineReducers({
    adminSlice,
    userSlice,
    mockupsSlice, 
    sessionSlice,
    commentsSlice
});
export default configureStore(
    {
        reducer: rootReducer
    }
);