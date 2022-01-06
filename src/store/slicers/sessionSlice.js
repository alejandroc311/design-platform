import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const isUserAuthenticated = createAsyncThunk("session/isUserAuthenticated", async (arg = {},{rejectWithValue}) => {
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
                    "Authorization": `Bearer ${accessToken}`
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
export const isAdminAuthenticated = createAsyncThunk("session/isAdminAuthenticated", async (arg = {}, {rejectWithValue}) => {
    const accessToken = localStorage.getItem("platform-token");
    if (accessToken) {
        const isAdminAuthenticated = await fetch(
            "http://localhost:8080/authenticateAdmin", 
            {
                method: "POST",
                body: JSON.stringify({
                    accessToken
                }),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }   
        )
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            rejectWithValue(null);
        });
        return isAdminAuthenticated;
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
        userCredentialsError: false,
        isAdminAuthenticated: false
    },
    reducers:{
        throwError: (state, {payload}) => {
            return {...state, userExistsError: true, userCredentialsError: false};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(isUserAuthenticated.fulfilled, (state = {}) => {
            return {...state, isUserAuthenticated: true};
        })
        .addCase(isUserAuthenticated.rejected, (state = {}) => {
            return {...state, isUserAuthenticated: false};
        })
        .addCase("user/logUserOut/fulfilled", (state = {}) => {
            return {...state, isUserAuthenticated: false, userCredentialsError: false, userExistsError: false, isAdminAuthenticated: false};
        })
        .addCase("user/getUser/rejected", (state = {}) => {
            return {...state, userCredentialsError: true, userExistsError: false};
        })
        .addCase("user/getUser/fulfilled", (state = {}) => {
            return {...state, userCredentialsError: false};
        })
        .addCase("admin/getAdmin/rejected", (state = {}) => {
            return {...state, userCredentialsError: true};
        })
        .addCase("admin/getAdmin/fulfilled", (state = {}) => {
            return {...state, userCredentialsError: false};
        })
        .addCase(isAdminAuthenticated.fulfilled, (state = {}) => {
            return {...state, isAdminAuthenticated: true};
        })
        .addCase(isAdminAuthenticated.rejected, (state = {}) => {
            return {...state, isAdminAuthenticated: false};
        });
    }
});
export const {throwError} = sessionSlice.actions;
export default sessionSlice.reducer;