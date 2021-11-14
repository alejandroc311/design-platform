import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
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
            .addCase(getMockups.fulfilled, mockupsAdapter.addOne);    
    }
});


export const {selectAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
export const  selectMockups = createSelector(selectAll, (mockups) => mockups);
export default mockupsSlice.reducer