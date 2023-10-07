import React from "react";
import { useNavigate } from "react-router-dom";

export default function StandingsView(props) {
    const navigate = useNavigate();

    function renderStandings() {
        let content;

        if (props.isLoading) {
            content = <div className="loader"></div>;
        } else if (!props.isLoading && !props.error) {
            const standings = props.standings.response[0].league.standings[0];
            let rowClass;
            // TODO maybe add horizontal lines between each row? or below the header?
            content = (
                <table className="teams">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Club</th>
                            <th>Played</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team) => {
                            // TODO fix this redirect and team set
                            const logoOrTextClick = () => {
                                props.setTeam(team);
                                navigate("/home");
                            };

                            if (props.team.id === team.team.id) {
                                rowClass = "glow";
                            } else {
                                rowClass = "";
                            }

                            return (
                                <tr key={team.team.id} className={rowClass}>
                                    <td>{team.rank}</td>
                                    <td className="club">
                                        <img
                                            src={team.team.logo}
                                            alt="logo"
                                            width="25"
                                            onClick={logoOrTextClick}
                                        ></img>
                                        <span onClick={logoOrTextClick}>{team.team.name}</span>
                                    </td>
                                    <td>{team.all.played}</td>
                                    <td>{team.all.win}</td>
                                    <td>{team.all.draw}</td>
                                    <td>{team.all.lose}</td>
                                    <td>{team.all.goals.for}</td>
                                    <td>{team.all.goals.against}</td>
                                    <td>{team.goalsDiff}</td>
                                    <td>{team.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            content = <div>{props.error}</div>;
        }

        return <div className="flexParent">{content}</div>;
    }

    return <div>{renderStandings()}</div>;
}
