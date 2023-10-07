import React from "react";
import { useSelector } from "react-redux";
import HomeView from "./homeView";
import Nav from "../navbar";
import { useGetStatsQuery } from "../../services/footballApi";
import { useGetTeamCoachQuery } from "../../services/footballApi";

export default function Home() {
    const season = useSelector((state) => state.league.season);
    const team = useSelector((state) => state.team.team);
    const league = useSelector((state) => state.league.league);
    const venue = useSelector((state) => state.team.teamVenue);

    const stats = useGetStatsQuery({
        season,
        team,
        league,
    });

    const coach = useGetTeamCoachQuery(team);

    return (
        <div>
            <Nav />
            <HomeView team={team} venue={venue} stats={stats} coach={coach} />
        </div>
    );
}
