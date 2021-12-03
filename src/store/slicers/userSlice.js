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
    //If the server returns an error with "next(error)," 
    //then login will be assigned a new error object.
    //If login is an error object, the thunk returns null
    //and will be handled by the "getUser.fulfilled" case.
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
            return {...state, mockups: {...state.mockups, [action.payload.id]: action.payload}}
        })
       
      }
});
export const selectUser = createSelector((state) => state.userSlice, (user) => user);
export default userSlice.reducer;