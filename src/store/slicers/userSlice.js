import { createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getMockups} from "./mockupsSlice";
export const getUser = createAsyncThunk("user/getUser", async () => {
    const user = await fetch(
        "http://localhost:8080/user", 
        {
            method: "GET"
        })
        .then( res => res.json());
    console.log(user);
    return user;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        id:"",
        proyectId: "",
        accountId: "",
        mockups: {},
        isLoggedIn: false,
    },
    reducers: {

    }, 
    //extraReducers is a createSlice parameter that takes a builder object  as its parameter. The builder can 
    //take an action type and a callback that functions as a reducer as its parameters.
    // Since createAsyncThunk generates and dispatches a "fulfilled" action type when the "user/getUser" 
    //action type is dispatched (when getUser is called), we can listen for "getUser.fulfilled" inside 
    //the builder.
    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state = {}, action) => {
            let {userid} = action.payload;
            //state.id = userid; state.isLoggedIn = true;
            return {...state, id: userid, isLoggedIn: true} 

        })
        .addCase(getMockups.fulfilled, (state = {}, action) => {
            //state.mockups[action.payload.id] = action.payload;
            return {...state, mockups: {...state.mockups, [action.payload.id]: action.payload}}
        })
       
      }
});
export const selectUser = createSelector((state) => state.userSlice, (user) => user);
export default userSlice.reducer;