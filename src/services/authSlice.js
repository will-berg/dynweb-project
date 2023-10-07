import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    favoriteTeam: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        reset: (state) => {
            state.user = null;
            state.favoriteTeam = null;
        },
        setFavoriteTeam: (state, action) => {
            state.favoriteTeam = action.payload;
        },
    },
});

export const { setUser, reset, setFavoriteTeam } = authSlice.actions;
export default authSlice.reducer;
