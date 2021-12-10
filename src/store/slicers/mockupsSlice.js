import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
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
                "Authorization": "Bearer " + `${localStorage.getItem("platform-token")}`
            }
        })
        .then( response => response.json());
    console.log(mockups.mockups);
    return mockups.mockups;
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
        builder.addCase(getMockups.fulfilled, (state = {}, {payload}) => {
            mockupsAdapter.addMany(state, payload)});
    }    
});


export const {selectAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
export const  selectMockups = createSelector(selectAll, (mockups) => mockups);
export default mockupsSlice.reducer;