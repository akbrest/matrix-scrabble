import { createSlice } from '@reduxjs/toolkit';
import { fetchWord } from '../actions/wordActions';

const wordSlice = createSlice({
    name: 'word',
    initialState: {
        word: "" as string,
        isLoading: false,
        status: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWord.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchWord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload;
        });
        builder.addCase(fetchWord.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export default wordSlice.reducer;
