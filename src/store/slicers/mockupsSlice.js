import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";

export const getMockups = createAsyncThunk("mockups/getMockups", async (proyectId, {rejectWithValue}) => {
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
            return rejectWithValue(null);
        });
    return mockups.mockups;
});
export const rating = createAsyncThunk("mockups/rating", async (ratingInfo, {rejectWithValue}) => {
    const {id, score} = ratingInfo;
    fetch(
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
        return rejectWithValue(null);
    });
    return {id, rating: parseInt(score)};
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
            mockupsAdapter.setAll(state, payload);
        })
        .addCase(rating.fulfilled, mockupsAdapter.upsertOne)
        .addCase("user/logUserOut/fulfilled", (state = {}) => {
            mockupsAdapter.removeAll(state);
        });
    }    
});

export default mockupsSlice.reducer;