const { createSlice, createEntityAdapter, createAsyncThunk } = require("@reduxjs/toolkit");

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
    return comments;
});
const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.dateCreated.localeCompare(a.dateCreated)
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
        .addCase(getComments.fulfilled, commentsAdapter.setAll);
    }
});
export default commentsSlice.reducer;