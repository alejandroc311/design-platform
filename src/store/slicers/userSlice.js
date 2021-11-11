import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const getUser = createAsyncThunk("user/getUser", async () => {
    
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

    }
});
export const {login} = userSlice.actions;
export default userSlice.reducer;