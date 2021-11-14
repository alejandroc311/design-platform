import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
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
const mockupsSlice = createSlice({
    name: "mockups",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getMockups.fulfilled, (state = {}, action) => {mockupsAdapter.addOne(state, action.payload)});    
    }
});

export const {selectId, setAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
export default mockupsSlice.reducer