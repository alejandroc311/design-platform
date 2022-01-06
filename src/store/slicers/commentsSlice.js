const { createSlice, createEntityAdapter, createAsyncThunk, createSelector } = require("@reduxjs/toolkit");

export const getComments = createAsyncThunk("comments/getComments", async (proyectId, {rejectWithValue}) => {
    const comments = await fetch(
        "http://localhost:8080/getComments",
        {
            method: "POST",
            body: JSON.stringify({
                proyectId
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
            }
        }
    )
    .then(res => res.json())
    .catch(error => {
        console.error(error);
        return rejectWithValue(null);
    });

    console.log(comments);
    return comments.body.comments;
});
const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.dateCreated.localeCompare(b.dateCreated)
});
const initialState = commentsAdapter.getInitialState({
    status: "idle"
});
const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase("comments/getComments/fulfilled", (state = {}, {payload}) => {
            console.log(payload);
            commentsAdapter.setAll(state, payload)
        })
        .addCase("comments/getComments/rejected", (state ={}) => {commentsAdapter.removeAll(state)});
    }
});
export const {selectAll} = commentsAdapter.getSelectors((state = {}) => state.commentsSlice);
export const selectComments = createSelector(selectAll, (comments) => comments);
export default commentsSlice.reducer;