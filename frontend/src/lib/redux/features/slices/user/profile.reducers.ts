import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../actions/profile.actions";

const initialState = {
    error: false,
    loading: false,
    message: null,
    profile: null
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.error = false // Clear any previous errors
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true
            });
    }
});

export default profileSlice.reducer;
