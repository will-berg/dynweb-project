// Collection of reducer logic and actions
import { createSlice } from "@reduxjs/toolkit";

// State variables
const initialState = {
    league: "39", // Default league premier league
    season: "2021", // TODO, calculate current season somehow
};

/* createSlice generates all actions (type, creator functions, objects) given a slice name and a reducer object with
reducers. Generates actions: {type: "sliceName/reducerName"}. createSlice also generates action creators with the
same name as the reducer functions: counterSlice.actions.reducerName(). createSlice allows for immutable updates */
export const leagueSlice = createSlice({
    // Slice name as well as state name
    name: "league",
    initialState,
    // Reducers to run depending on dispatched action
    reducers: {
        setLeague: (state, action) => {
            state.league = action.payload;
        },
        setSeason: (state, action) => {
            state.season = action.payload;
        },
    },
});

// Action creators for this slice
export const { setLeague, setSeason } = leagueSlice.actions;
export default leagueSlice.reducer;
