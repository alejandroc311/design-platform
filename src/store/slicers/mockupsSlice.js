import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { logUserOut } from "./userSlice";
export const getMockups = createAsyncThunk("mockups/getMockups", async (proyectId) => {
    const mockups = await fetch(
        "http://localhost:8080/mockups",
        {
            method: "POST",
            body: JSON.stringify({
                proyectId
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
            }
        })
        .then( response => response.json())
        .catch(error => {
            console.error(error);
            return new Error("Error!", error);
        });
    return (
        mockups instanceof Error ? null : mockups.mockups
    );
});
const mockupsAdapter = createEntityAdapter();
const initialState = mockupsAdapter.getInitialState({
    status: "idle"
});
export const {selectAll, removeAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
export const  selectMockups = createSelector(selectAll, (mockups) => mockups);
const mockupsSlice = createSlice({
    name: "mockups",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getMockups.fulfilled, (state = {}, {payload}) => {
            if (payload) {
                mockupsAdapter.addMany(state, payload);
            }
        });
        builder.addCase("user/logUserOut/fulfilled", (state = {}) => {
            console.log("inside lgout part 2");
            mockupsAdapter.removeAll(state);
        });
    }    
});

export default mockupsSlice.reducer;