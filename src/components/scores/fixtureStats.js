// TODO Component should display the stats for one fixture, fixtureId passed as prop from scoresView
import React from "react";
import { useGetFixtureStatsQuery } from "../../services/footballApi";

export default function FixtureStats({ fixture }) {
    const { data, error, isLoading } = useGetFixtureStatsQuery(fixture);
    let content;

    if (isLoading) {
        content = <div className="loader"></div>;
    } else if (!isLoading && !error) {
        console.log(data);
        const renderFixStats = (team1, team2) => {
            try {
                return (
                    <div>
                        <center>
                            <div className="teamRow">
                                <img src={team1.team.logo} alt="logo" width="25"></img>
                                <span className="fixtureTitle">
                                    {" " + team1.team.name + " vs. " + team2.team.name + " "}
                                </span>
                                <img src={team2.team.logo} alt="logo" width="25"></img>
                            </div>
                            <div>
                                {(team1.statistics[9].value ? team1.statistics[9].value : 0) +
                                    " " +
                                    team1.statistics[9].type +
                                    " " +
                                    (team2.statistics[9].value
                                        ? team2.statistics[9].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[2].value ? team1.statistics[2].value : 0) +
                                    " " +
                                    team1.statistics[2].type +
                                    " " +
                                    (team2.statistics[2].value
                                        ? team2.statistics[2].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[0].value ? team1.statistics[0].value : 0) +
                                    " " +
                                    team1.statistics[0].type +
                                    " " +
                                    (team2.statistics[0].value
                                        ? team2.statistics[0].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[12].value
                                    ? team1.statistics[12].value
                                    : 0) +
                                    " " +
                                    team1.statistics[12].type +
                                    " " +
                                    (team2.statistics[12].value
                                        ? team2.statistics[12].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[7].value ? team1.statistics[7].value : 0) +
                                    " " +
                                    team1.statistics[7].type +
                                    " " +
                                    (team2.statistics[7].value
                                        ? team2.statistics[7].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[6].value ? team1.statistics[6].value : 0) +
                                    " " +
                                    team1.statistics[6].type +
                                    " " +
                                    (team2.statistics[6].value
                                        ? team2.statistics[6].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[8].value ? team1.statistics[8].value : 0) +
                                    " " +
                                    team1.statistics[8].type +
                                    " " +
                                    (team2.statistics[8].value
                                        ? team2.statistics[8].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[10].value
                                    ? team1.statistics[10].value
                                    : 0) +
                                    " " +
                                    team1.statistics[10].type +
                                    " " +
                                    (team2.statistics[10].value
                                        ? team2.statistics[10].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[11].value
                                    ? team1.statistics[11].value
                                    : 0) +
                                    " " +
                                    team1.statistics[11].type +
                                    " " +
                                    (team2.statistics[11].value
                                        ? team2.statistics[11].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[13].value
                                    ? team1.statistics[13].value
                                    : 0) +
                                    " " +
                                    team1.statistics[13].type +
                                    " " +
                                    (team2.statistics[13].value
                                        ? team2.statistics[13].value
                                        : 0)}
                            </div>
                            <div>
                                {(team1.statistics[15].value
                                    ? team1.statistics[15].value
                                    : 0) +
                                    " " +
                                    "Pass Accuracy" +
                                    " " +
                                    (team2.statistics[15].value
                                        ? team2.statistics[15].value
                                        : 0)}
                            </div>
                        </center>
                    </div>
                );
            } catch (error) {
                return (
                    <div>
                        <span className="notPlayed">Match Not Played Yet</span>
                    </div>
                );
            }
        };

        content = (
            <div className="fixtureStats">
                {/* Access data props in here to show the fixture stats */}
                {renderFixStats(data.response[0], data.response[1])}
            </div>
        );
    } else {
        content = <div>{error}</div>;
    }

    return <>{content}</>;
}
