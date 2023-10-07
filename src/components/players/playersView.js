import React from "react";
import { useState } from "react";

export default function PlayersView({ players, isLoading, error }) {
    let content;
    const [pos, setPos] = useState("All");

    if (isLoading) {
        content = <div className="loader"></div>;
    } else if (!isLoading && !error) {
        const checkFilter = () => {
            if (pos === "All") {
                return players.response[0].players.map(renderPlayerBox);
            } else if (pos === "Defender") {
                return players.response[0].players
                    .filter(({ position }) => pos === position)
                    .map(renderPlayerBox);
            } else if (pos === "Goalkeeper") {
                return players.response[0].players
                    .filter(({ position }) => pos === position)
                    .map(renderPlayerBox);
            } else if (pos === "Attacker") {
                return players.response[0].players
                    .filter(({ position }) => pos === position)
                    .map(renderPlayerBox);
            } else if (pos === "Midfielder") {
                return players.response[0].players
                    .filter(({ position }) => pos === position)
                    .map(renderPlayerBox);
            }
        };

        const renderPlayerBox = ({ name, age, number, position, photo, id }) => {
            return (
                <div className="player-box" key={id}>
                    <img src={photo} alt="player" className="player" />
                    <ul>
                        <li>Name: {name}</li>
                        <li>Age: {age}</li>
                        <li>Number: {number ? number : "N/A"}</li>
                        <li>Position: {position}</li>
                    </ul>
                </div>
            );
        };

        content = (
            <>
                <select
                    id="positions"
                    onChange={(option) => {
                        setPos(option.target.value);
                    }}
                >
                    <option value={"All"}>All</option>
                    <option value={"Goalkeeper"}>Goalkeepers</option>
                    <option value={"Defender"}>Defenders</option>
                    <option value={"Midfielder"}>Midfielders</option>
                    <option value={"Attacker"}>Attackers</option>
                </select>
                <div className="players">{checkFilter()}</div>
            </>
        );
    } else {
        content = <div>{error}</div>;
    }

    return <div>{content}</div>;
}
