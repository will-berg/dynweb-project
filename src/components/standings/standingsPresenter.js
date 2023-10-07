import React from "react";
import StandingsView from "./standingsView";
import Nav from "../navbar";
import { useSelector, useDispatch } from "react-redux";
import { useGetStandingsQuery } from "../../services/footballApi";
import { setTeam } from "../../services/teamSlice";

export default function Standings() {
    const dispatch = useDispatch();

    const team = useSelector((state) => state.team.team);
    const league = useSelector((state) => state.league.league);
    const season = useSelector((state) => state.league.season);

    const { data, error, isLoading } = useGetStandingsQuery({ league, season });

    return (
        <div>
            <Nav />
            <StandingsView
                standings={data}
                team={team}
                setTeam={(team) => {
                    dispatch(setTeam(team));
                }}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}
