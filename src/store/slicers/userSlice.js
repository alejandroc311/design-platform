import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

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
    //extraReducers is a createSlice parameter that takes a builder object  as its parameter. The builder can 
    //take an action type and a callback that functions as a reducer as its parameters.
    // Since createAsyncThunk generates and dispatches a "fulfilled" action type when the "user/getUser" 
    //action type is dispatched (when getUser is called), we can listen for "getUser.fulfilled" inside 
    //the builder.
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state = {}, action) => {
            let {userid} = action.payload; 
            return {...state, id: userid, isLoggedIn: true}
        })
      }
});
export default userSlice.reducer;