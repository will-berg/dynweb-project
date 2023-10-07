import React from "react";
import ScoresView from "./scoresView";
import Nav from "../navbar";
import { useSelector } from "react-redux";
import { useGetScoresQuery } from "../../services/footballApi";

export default function Scores() {
    const team = useSelector((state) => state.team.team);
    const league = useSelector((state) => state.league.league);
    const season = useSelector((state) => state.league.season);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const { data, error, isLoading } = useGetScoresQuery({
        league,
        season,
        team,
    });

    return (
        <div>
            <Nav />
            <ScoresView scores={data} isLoading={isLoading} error={error} months={months} />
        </div>
    );
}
