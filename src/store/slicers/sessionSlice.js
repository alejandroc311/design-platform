import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name:"session",
    initialState:{
        authenticationError: false,
        userExistsError: false

    },
    reducers:{
        throwError: (state, action) => {
            console.log(action.payload);
            return {...state};
        }
    }
});
export const {throwError} = sessionSlice.actions;
export default sessionSlice.reducer;