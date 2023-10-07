import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./services/teamSlice";
import leagueReducer from "./services/leagueSlice";
import authReducer from "./services/authSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { footballApi } from "./services/footballApi";

/* Holds the application state, actions are dispatched to the store in response to events and the store runs the corresponding
reducer function and calculates the new state. The store notifies subscribed parts of the UI of the state change */
export const store = configureStore({
    // Adds key as state section, i.e., state.key and value as reducer used to update that section
    // Passes reducer object to combineReducers to generate root reducer
    reducer: {
        // Client state
        team: teamReducer,
        league: leagueReducer,
        auth: authReducer,
        // Add the generated reducer as a specific top-level slice, server state
        [footballApi.reducerPath]: footballApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(footballApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
