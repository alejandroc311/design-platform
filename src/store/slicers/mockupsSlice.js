import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { getUser } from "./userSlice";
export const getMockups = createAsyncThunk("mockups/getMockups", async (id) => {
    const mockups = await fetch(
        "http://localhost:8080/mockups",
        {
            method: "POST",
            body: JSON.stringify({
                id,
                proyectid: "123445"
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then( response => response.json());
    console.log(mockups);
    return mockups.body
});
const mockupsAdapter = createEntityAdapter();
const initialState = mockupsAdapter.getInitialState({
    status: "idle"
}); 
export const {selectAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
export const  selectMockups = createSelector(selectAll, (mockups) => mockups);
const mockupsSlice = createSlice({
    name: "mockups",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getMockups.fulfilled, mockupsAdapter.addOne)
    }    
});



export default mockupsSlice.reducer