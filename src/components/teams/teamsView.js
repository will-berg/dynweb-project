import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamsView(props) {
    const navigate = useNavigate();

    function renderTeams() {
        let content;

        if (props.isLoading) {
            content = <div className="loader"></div>;
        } else if (!props.isLoading && !props.error) {
            content = (
                <div className="teams">
                    {props.teams.response.map((team) => {
                        const logoOrTextClick = () => {
                            console.log("Set team: " + team);
                            props.setTeam(team);
                            navigate("/home");
                        };

                        return (
                            <div className="teamRow" key={team.team.id}>
                                <img
                                    src={team.team.logo}
                                    alt="logo"
                                    width="25"
                                    onClick={logoOrTextClick}
                                ></img>
                                <span onClick={logoOrTextClick}>{team.team.name}</span>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            content = <div>{props.error}</div>;
        }

        return <div className="flexParent">{content}</div>;
    }

    return (
        <div className="teamTable">
            <select
                id="leagues"
                onChange={(option) => {
                    props.setLeague(option.target.value);
                }}
            >
                <option value={props.leagueIds.premierLeague}>Premier League</option>
                <option value={props.leagueIds.laLiga}>LaLiga</option>
                <option value={props.leagueIds.bundesliga}>Bundesliga</option>
            </select>
            <select
                id="seasons"
                onChange={(option) => {
                    props.setSeason(option.target.value);
                }}
            >
                <option value="2021">2021</option>
            </select>
            <div>{renderTeams()}</div>
        </div>
    );
}
