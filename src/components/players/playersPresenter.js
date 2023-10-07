import React from "react";
import PlayersView from "./playersView";
import Nav from "../navbar";
import { useSelector } from "react-redux";
import { useGetPlayersQuery } from "../../services/footballApi";

export default function Standings() {
    const team = useSelector((state) => state.team.team);

    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetPlayersQuery(team);
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = footballApi.endpoints.getTeamByName.useQuery('team.id')

    return (
        <div>
            <Nav />
            <PlayersView players={data} isLoading={isLoading} error={error} />
        </div>
    );
}
