// React-specific entry point for importing createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_KEY } from "../apiConfig";

// Defines a service using a base URL and expected endpoints, queries api-football
export const footballApi = createApi({
    reducerPath: "footballApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // Set the key as a header
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", API_KEY);
            return headers;
        },
    }),
    // Endpoints we want to access
    endpoints: (builder) => ({
        getPlayers: builder.query({
            query: (team) => `/players/squads?team=${team.id}`,
        }),
        getScores: builder.query({
            query: (obj) =>
                `/fixtures/?league=${obj.league}&season=${obj.season}&team=${obj.team.id}`,
        }),
        getStandings: builder.query({
            query: (obj) => `/standings?league=${obj.league}&season=${obj.season}`,
        }),
        getTeams: builder.query({
            query: (obj) => `/teams?league=${obj.league}&season=${obj.season}`,
        }),
        getStats: builder.query({
            query: (obj) =>
                `/teams/statistics?season=${obj.season}&team=${obj.team.id}&league=${obj.league}`,
        }),
        getFixtureStats: builder.query({
            query: (fixture) => `/fixtures/statistics?fixture=${fixture}`,
        }),
        getTeamCoach: builder.query({
            query: (team) => `/coachs?team=${team.id}`,
        }),
    }),
});

// Export hooks for usage in components, the hooks are auto-generated based on the defined endpoints.
// Service auto-generates slice reducer (footballApi.reducer) that contains these reducers.
// Service also generates a custom middleware that handles data fetching (footballApi.middleware)
export const {
    useGetPlayersQuery,
    useGetScoresQuery,
    useGetStandingsQuery,
    useGetTeamsQuery,
    useGetStatsQuery,
    useGetFixtureStatsQuery,
    useGetTeamCoachQuery,
} = footballApi;
