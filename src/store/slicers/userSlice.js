import { createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getMockups} from "./mockupsSlice";
import { isUserAuthenticated } from "./sessionSlice";
export const getUser = createAsyncThunk("user/getUser", async (loginData, {rejectWithValue}) => {
    let {email, password} = loginData;
    let login = await fetch(
        "http://localhost:8080/user",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    )
    .then(res =>  res.json())
    .catch(error =>  {
        console.error(error);
        return rejectWithValue(null);
    });
    //If the server returns an error with "next(error)" callback, 
    //then the thunk will be rejected and will dispatch a "rejected" action that will be handled by the session
    //slice in order to set a "userCredentialsError."
    //If the credentials are valid, and a response with a body is sent back from the server, 
    //then the thunk will dispatch a "fulfilled" action with a the server's response as its payload.
    return login;
});
export const logUserOut = createAsyncThunk("user/logUserOut", async () => {
    return null;
});
const initialState = {
    id:"",
    proyectId: "",
    accountId: "",
    mockups: {},
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state = {}, {payload}) => {
            let id, accountId, proyectId, accessToken;
            console.log(payload)
            if (payload) {
                ({body:{user:{id, accountId, proyectId}, accessToken}} = payload);
                localStorage.setItem("platform-token", accessToken);
                return {...state, id, accountId, proyectId, isLoggedIn: true};
            }
        })
        .addCase(getMockups.fulfilled, (state = {}, {payload}) => {
            return {...state, mockups: {...state.mockups, ...payload}}
        })
        .addCase(isUserAuthenticated.fulfilled, (state = {}, {payload}) => {
            if (payload){
                const {body:{id, proyectId, accountId}} = payload;
                console.log(payload);
                return {...state, id, proyectId, accountId, isLoggedIn: true};
            }
        })
        .addCase(logUserOut.fulfilled, (state = {}) => {
            localStorage.removeItem("platform-token");
            console.log("Inside logout");
            return {...state, id: "", proyectId: "", accountId: "", mockups: {}, isLoggedIn: false};
        })
    }
});

export const selectUser = createSelector((state) => state.userSlice, (user) => user);
export const {setUser} = userSlice.actions;
export default userSlice.reducer;