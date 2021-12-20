import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const isUserAuthenticated = createAsyncThunk("session/isUserAuthenticated", async () => {
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
            return error;
        });

        return (isUserAuthenticated instanceof Error ? null : isUserAuthenticated);
    }
});
const sessionSlice = createSlice({
    name:"session",
    initialState:{
        userExistsError: false,
        isUserAuthenticated: false
    },
    reducers:{
        throwError: (state, action) => {
            console.log(action.payload);
            return {...state, userExistsError: true};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(isUserAuthenticated.fulfilled, (state = {}, {payload}) => {
            if (payload){
                return {...state, isUserAuthenticated: true};
            }
        })
    }
});
export const {throwError} = sessionSlice.actions;
export default sessionSlice.reducer;