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
export const rating = createAsyncThunk("mockups/rating", async (ratingInfo) => {
    const {id, score} = ratingInfo;
    const rate = await fetch(
        "http://localhost:8080/rating",
        {
            method: "POST",
            body: JSON.stringify({
                id, score
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
            }
        }
    )
    .then( res => res.json())
    .catch( error => {
        console.error(error);
        return new Error(error);
    });
    return (rate instanceof Error ? null : {id, rating: parseInt(score)});
});
const mockupsAdapter = createEntityAdapter({
});
const initialState = mockupsAdapter.getInitialState({
    status: "idle"
});
export const {selectAll, selectById, selectIds, removeAll} = mockupsAdapter.getSelectors(state => state.mockupsSlice);
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
                mockupsAdapter.setAll(state, payload);
            }
        })
        .addCase(rating.fulfilled, mockupsAdapter.upsertOne);
        builder.addCase("user/logUserOut/fulfilled", (state = {}) => {
            mockupsAdapter.removeAll(state);
        });
    }    
});

export default mockupsSlice.reducer;