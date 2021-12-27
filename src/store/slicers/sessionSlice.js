import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const isUserAuthenticated = createAsyncThunk("session/isUserAuthenticated", async ( arg = {},{rejectWithValue}) => {
    const accessToken = localStorage.getItem("platform-token");
    if (accessToken) {
        const isUserAuthenticated = await fetch(
            "http://localhost:8080/authenticateUser", 
            {
                method: "POST",
                body: JSON.stringify({
                accessToken
                }),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
                }
            }   
        )
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            return rejectWithValue(null);
        });
        return isUserAuthenticated;
    }
    else {
        return rejectWithValue(null);
    }
});
const sessionSlice = createSlice({
    name:"session",
    initialState:{
        userExistsError: false,
        isUserAuthenticated: false,
        userCredentialsError: false
    },
    reducers:{
        throwError: (state, {payload}) => {
            return {...state, userExistsError: true, userCredentialsError: false};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(isUserAuthenticated.fulfilled, (state = {}, {payload}) => {
            console.log("Inside fulfilled is user auth ")
            return {...state, isUserAuthenticated: true};
        })
        .addCase(isUserAuthenticated.rejected, (state = {}) => {
            return {...state, isUserAuthenticated: false};
        })
        .addCase("user/logUserOut/fulfilled", (state = {}) => {
            return {...state, isUserAuthenticated: false, userCredentialsError: false, userExistsError: false};
        })
        .addCase("user/getUser/rejected", (state = {}) => {
            console.log("Inside rejected thunk");
            return {...state, userCredentialsError: true, userExistsError: false};
        })
        .addCase("user/getUser/fulfilled", (state = {}) => {
            return {...state, userCredentialsError: false};
        });
    }
});
export const {throwError} = sessionSlice.actions;
export default sessionSlice.reducer;