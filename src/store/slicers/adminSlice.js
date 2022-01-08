import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAdmin = createAsyncThunk("admin/getAdmin", async ({email, password}, {rejectWithValue}) => {
    let admin = await fetch(
        "http://localhost:8080/loginAdmin",
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
    .then(res => res.json())
    .catch(error => {
        console.error(error);
        return rejectWithValue(null);
    });
    const {body:{accessToken}} = admin;
    localStorage.setItem("platform-token", accessToken);
    return admin;
});
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        id: "",
        proyects: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAdmin.fulfilled, (state = {}, {payload}) => {
            const {body:{admin:{id}}} = payload;
            return {...state, id};
        })
        .addCase(getAdmin.rejected, (state = {}) => {
            return {...state, id: "", proyects: []};
        })
        .addCase("session/isAdminAuthenticated/fulfilled", (state = {}, {payload}) => {
            const {body:{admin:{id, proyects}}} = payload;
            return {...state, id, proyects: [...proyects]};
        })
        .addCase("session/isAdminAuthenticated/rejected", (state = {}) => {
            return {...state, id: "", proyects: []};
        })
        .addCase("user/logUserOut/fulfilled", (state = {}) => {
            return {...state, id: "", proyects:[]};
        });
        
    }
});

export default adminSlice.reducer;