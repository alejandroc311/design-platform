import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id:"",
        proyectId: "",
        accountId: "",
        isLoggedIn: false,
    },
    reducers: {
        login: (state = {}, action) => {
            let {email, password} = action.payload;
            //some async/await to fetch the user and return the part of the state i want.
            fetch("", {
                credentials: "include",
                headers:{},
                body:{
                    email,
                    password
                }
            })
            .then(response => {
                let {id, accountId, proyectId} = response;
                return {
                    ...state, 
                    isLoggedIn: true,
                    id,
                    accountId,
                    proyectId
                }
            })
            .catch(e => console.error(e));
        },
        logout: (state = {}) => {
            fetch("", {
                credentials: "include",
                headers: {}
            })
            .then(response => {
                return {...state, isLoggedIn: false, id: "", accountId: "", proyectId: ""}
            })
            .catch();
        }

    }
});

export const {login} = userSlice.actions;
export default userSlice.reducer;