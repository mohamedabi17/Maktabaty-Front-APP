import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchcategories = createAsyncThunk("categoriesSlice/fetchProducts", async () => {
    const res = await fetch('http://127.0.0.1:8000/getcategories');
    const data = await res.json();
    return data;
})

const categoriesSlice = createSlice({
    initialState: [],
    name: 'categoriesSlice',
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchcategories.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})


export const { } = categoriesSlice.actions;
export default categoriesSlice.reducer;