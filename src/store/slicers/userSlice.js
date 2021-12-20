import { createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getMockups} from "./mockupsSlice";
import { isUserAuthenticated } from "./sessionSlice";
export const getUser = createAsyncThunk("user/getUser", async (loginData) => {
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
        return new Error("Error!", {cause: error})
    });
    //If the server returns an error with "next(error)," 
    //then login will be assigned a new error object.
    //If login is an error object, the thunk returns null
    //and will be handled by the "getUser.fulfilled" case.
    return (login instanceof Error ? null : login);
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
    reducers: {
        //logout: (state) => {
            //localStorage.removeItem("platform-token");
            //console.log(state);
            //return {...state, id: "", proyectId: "", accountId: "", mockups: {}, isLoggedIn: false};
        //},
        setUser: (state, {payload}) => {
            const {id, accountId, proyectId} = payload;
            return {...state, id, accountId, proyectId, isLoggedIn: true};
        }
    }, 
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
            else {
                return {...state};
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
            } else {
                return {...state};
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