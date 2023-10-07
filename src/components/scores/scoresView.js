import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FixtureStats from "./fixtureStats";

export default function ScoresView({ scores, isLoading, error, months }) {
    function renderScores() {
        const gameStatus = (date) => {
            // TODO calculates if game is live, played, or upcoming; should affect rendering, i.e. different sections for each
        };

        const extractMonthDateYear = (fixtureDate) => {
            const monthNr = parseInt(fixtureDate.slice(5, 7)) - 1;
            const month = months[monthNr];
            const date = parseInt(fixtureDate.slice(8, 10));
            const year = parseInt(fixtureDate.slice(0, 4));
            return [monthNr, date, year, `${month} ${date}, ${year}`];
        };

        const isValidScore = (score) => score !== null;

        let content;

        if (isLoading) {
            content = <div className="loader"></div>;
        } else if (!isLoading && !error) {
            const renderScoreBox = ({ fixture, teams, goals }) => {
                return (
                    <div className="score-box" key={fixture.id}>
                        <center>
                            <span className="date">
                                {extractMonthDateYear(fixture.date)[3]}
                                <Popup
                                    trigger={<button className="statButton">See Stats</button>}
                                    modal
                                    nested
                                    className="statPopup"
                                >
                                    {(close) => (
                                        <div className="modal">
                                            <div className="content">
                                                <FixtureStats fixture={fixture.id} />
                                            </div>
                                            <div className="actions">
                                                <button
                                                    className="statButton"
                                                    onClick={() => {
                                                        close();
                                                    }}
                                                >
                                                    Return
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </span>
                        </center>
                        <span className="home-score">
                            <img src={teams.home.logo} alt="home logo" width="35" />
                            <span>{teams.home.name}</span>
                            <span className="result">
                                {isValidScore(goals.home) ? goals.home : "-"}
                            </span>
                        </span>

                        <span className="away-score">
                            <img src={teams.away.logo} alt="away logo" width="35" />
                            <span>{teams.away.name}</span>
                            <span className="result">
                                {isValidScore(goals.away) ? goals.away : "-"}
                            </span>
                        </span>
                    </div>
                );
            };

            let res = scores.response.map(renderScoreBox).reverse();

            content = <div className="scores">{res}</div>;
        } else {
            content = <div>{error}</div>;
        }

        return <div className="viewText">{content}</div>;
    }

    return <div>{renderScores()}</div>;
}
