import React from "react";
import { MdCheckCircle, MdCancel, MdRemoveCircle } from "react-icons/md";
import {
    PieChart,
    Pie,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";

export default function HomeView({ team, venue, stats, coach }) {
    // Interesting props: goals, biggest, clean_sheet, failed_to_score, lineup, cards

    const renderPieChart = (data) => {
        return (
            <div>
                <center>
                    <p>The figure shows the total amount of goals at home and away</p>
                </center>
                <PieChart width={750} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="50%"
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </div>
        );
    };

    const renderBarChart = (data) => {
        return (
            <div>
                <center>
                    <p>
                        The figure shows the total number of goals for every 15 minute interval
                        as well as the percentage of total goals that number is equal to
                    </p>
                </center>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Goals" fill="#8884d8" />
                    <Bar dataKey="Percentage" fill="#82ca9d" />
                </BarChart>
            </div>
        );
    };

    const renderRecentForm = (form) => {
        let wins = 0;
        let draws = 0;
        let losses = 0;

        let res = form.split("").map((result) => {
            if (result === "W") {
                wins++;
                return <MdCheckCircle color="green" key={result + wins} />;
            } else if (result === "D") {
                draws++;
                return <MdRemoveCircle color="yellow" key={result + draws} />;
            } else {
                losses++;
                return <MdCancel color="red" key={result + losses} />;
            }
        });

        return (
            <div>
                <center>
                    <p>The figure shows recent results (left to right)</p>
                    {res.reverse()}
                </center>
                <h3>Total</h3>
                <span>
                    {<MdCheckCircle color="green" className="icon" />} Games won: {wins}
                </span>
                <span>
                    {<MdRemoveCircle color="yellow" className="icon" />} Games drawn: {draws}
                </span>
                <span>
                    {<MdCancel color="red" className="icon" />} Games lost: {losses}
                </span>
            </div>
        );
    };

    const renderStats = (stats) => {
        const goalTotal = [
            {
                name: "Goals Home",
                value: stats.goals.for.total.home,
            },
            {
                name: "Goals Away",
                value: stats.goals.for.total.away,
            },
        ];

        const timeSpan = stats.goals.for.minute;
        const goalsInterval = [
            {
                name: "0-15",
                Goals: timeSpan["0-15"].total,
                Percentage: parseFloat(timeSpan["0-15"].percentage),
            },
            {
                name: "16-30",
                Goals: timeSpan["16-30"].total,
                Percentage: parseFloat(timeSpan["16-30"].percentage),
            },
            {
                name: "31-45",
                Goals: timeSpan["31-45"].total,
                Percentage: parseFloat(timeSpan["31-45"].percentage),
            },
            {
                name: "46-60",
                Goals: timeSpan["46-60"].total,
                Percentage: parseFloat(timeSpan["46-60"].percentage),
            },
            {
                name: "61-75",
                Goals: timeSpan["61-75"].total,
                Percentage: parseFloat(timeSpan["61-75"].percentage),
            },
            {
                name: "76-90",
                Goals: timeSpan["76-90"].total,
                Percentage: parseFloat(timeSpan["76-90"].percentage),
            },
            {
                name: "91-105",
                Goals: timeSpan["91-105"].total,
                Percentage: parseFloat(timeSpan["91-105"].percentage),
            },
            {
                name: "106-120",
                Goals: timeSpan["106-120"].total ? timeSpan["106-120"].total : 0,
                Percentage: parseFloat(timeSpan["106-120"].percentage)
                    ? parseFloat(timeSpan["106-120"].percentage)
                    : 0,
            },
        ];

        return (
            <>
                <center>
                    <h1>Team Statistics</h1>
                </center>
                <div className="grid-stats">
                    <div className="pie-chart">{renderPieChart(goalTotal)}</div>
                    <div className="bar-chart">{renderBarChart(goalsInterval)}</div>
                    <div className="form">{renderRecentForm(stats.form)}</div>
                </div>
            </>
        );
    };

    const renderCoach = (coach) => {
        return (
            <div className="divitem">
                <center>
                    <h1>Team Coach</h1>
                </center>
                <div className="coach">
                    <img src={coach.photo} alt="coach img" />
                    <ul>
                        <li>Name: {coach.firstname + " " + coach.lastname}</li>
                        <li>Age: {coach.age} </li>
                        <li>Birthday: {coach.birth.date} </li>
                        <li>Birthplace: {coach.birth.place + ", " + coach.birth.country} </li>
                        <li>Height: {coach.height ? coach.height : "N/A"} </li>
                        <li>Weight: {coach.weight ? coach.weight : "N/A"} </li>
                        <li>Coach since: {coach.career[0].start} </li>
                    </ul>
                </div>
            </div>
        );
    };

    let coachContent;
    let content;

    if (stats.isLoading || coach.isLoading) {
        content = <div className="loader"></div>;
        coachContent = <div className="loader"></div>;
    } else if (!stats.isLoading && !stats.error && !coach.isLoading && !coach.error) {
        content = renderStats(stats.data.response);
        coachContent = renderCoach(coach.data.response[0]);
    } else {
        content = <div className="viewText">{stats.error}</div>;
        coachContent = <div className="viewText">{coach.error}</div>;
    }

    // TODO first item on home page should be filled with something more...
    return (
        <div>
            <div className="container">
                <div className="general">
                    <div className="divitem">
                        <img src={team.logo} alt="logo" align="left" />
                        <h1>{team.name + ", " + team.code}</h1>
                        <ul>
                            <li>Country: {team.country}</li>
                            <li>Founded: {team.founded}</li>
                        </ul>
                        <br /> <br />
                        <img src={venue.image} alt="venue" className="venueImg" align="left" />
                        <h2>{venue.name + ", " + venue.city}</h2>
                        <ul>
                            <li>Capacity: {venue.capacity.toLocaleString("en-US")}</li>
                            <li>Country: {team.country}</li>
                            <li>Address: {venue.address}</li>
                        </ul>
                    </div>
                    {coachContent}
                </div>
                <div className="item">{content}</div>
            </div>
        </div>
    );
}
