import { createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getMockups} from "./mockupsSlice";
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
    return (login instanceof Error ? null : login);
     
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
            let id, accountId, proyectId;
            if (action.payload) {
                ({body:{user:{id, accountId, proyectId}}} = action.payload);
                return {...state, id, accountId, proyectId};
            }
            else {
                return {...state};
            }
        })
        .addCase(getMockups.fulfilled, (state = {}, action) => {
            //state.mockups[action.payload.id] = action.payload;
            return {...state, mockups: {...state.mockups, [action.payload.id]: action.payload}}
        })
       
      }
});
export const selectUser = createSelector((state) => state.userSlice, (user) => user);
export default userSlice.reducer;