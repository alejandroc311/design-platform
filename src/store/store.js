import { configureStore, combineReducers } from "@reduxjs/toolkit";

export default configureStore(
    combineReducers(reducers)
)