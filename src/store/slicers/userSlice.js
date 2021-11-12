import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
        isLoggedIn: false,
    },
    reducers: {
        

    }, 
    //This part of the slice reducer handles thunk "getUser()." This thunk was genereated by createAsyncThunk.
    //createAsyncThunk also generates "fulfilled," "idle," "error," etc. action types that will be dispatched 
    //during the thunk's lifecycle. 
    
    //extraReducers is a createSlice parameter that takes a reducer builder as its parameter. The builder can take an 
    //action type as its first parameter and then a callback that functions as a reducer which returns state.
    //Since createAsyncThunk generates and dispatches a "fulfilled" action type when the user/getUser action
    //type is dispatched (when getUser is called), we can listen for "getUser.fulfilled" inside the builder
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state = {}, action) => {
            let {userid} = action.payload; 
            return {...state, id: userid, isLoggedIn: true}
        })
      }
});
export default userSlice.reducer;