import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetTeamsQuery } from "../../services/footballApi";
import { setTeam } from "../../services/teamSlice";
import { setLeague, setSeason } from "../../services/leagueSlice";
import TeamsView from "./teamsView";

export default function Teams() {
    const leagueIds = {
        premierLeague: "39",
        laLiga: "140",
        bundesliga: "78",
    };

    // Gives access to the dispatch method from the redux store
    const dispatch = useDispatch();
    /* Any time the redux store gets updated (action has been dispatched), useSelector re-runs its selector
	function and the component re-renders if the selector returns a different value */
    const league = useSelector((state) => state.league.league);
    const season = useSelector((state) => state.league.season);

    // Get the teams from the api using RTK query hook to make a request and assign data, error, and status variables.
    // This hook is available once it's been exported and the service has been defined
    const { data, error, isLoading } = useGetTeamsQuery({ league, season });

    return (
        <TeamsView
            teams={data}
            isLoading={isLoading}
            error={error}
            setTeam={(team) => {
                dispatch(setTeam(team));
            }}
            setLeague={(league) => {
                dispatch(setLeague(league));
            }}
            setSeason={(season) => {
                dispatch(setSeason(season));
            }}
            leagueIds={leagueIds}
        />
    );
}
