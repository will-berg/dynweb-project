import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    team: {},
    teamVenue: {},
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeam: (state, action) => {
            console.log(action.payload);
            state.team = action.payload.team;
            state.teamVenue = action.payload.venue;
        },
    },
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
