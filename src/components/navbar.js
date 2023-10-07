import React from "react";
import { Link } from "react-router-dom";
import { FcSportsMode } from "react-icons/fc";
import { BiLogIn, BiUserPlus, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../services/authSlice";

export default function Nav() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    let signLogo;
    let signText;

    if (user === null) {
        signLogo = <BiLogIn />;
        signText = "Sign In";
    } else {
        signLogo = <BiLogOut />;
        signText = "Sign Out";
    }

    const content = (
        <nav className="nav-container">
            <Link to="/home" className="webtitle">
                <h2>
                    <FcSportsMode /> Feetballs.
                </h2>
            </Link>
            <Link to="/home" className="navlink">
                <span>Home</span>
            </Link>
            <Link to="/players" className="navlink">
                <span>Players</span>
            </Link>
            <Link to="/standings" className="navlink">
                <span>Standings</span>
            </Link>
            <Link to="/scores" className="navlink">
                <span>Scores</span>
            </Link>
            <Link to="/choose-team" className="navlink">
                <span>Change Team</span>
            </Link>
            <Link to="/sign-up" className="navlink">
                <span className="user">
                    <BiUserPlus /> <span>Sign Up</span>
                </span>
            </Link>
            <Link
                to={user ? "/home" : "/sign-in"}
                className="navlink"
                onClick={() => {
                    if (user) {
                        dispatch(reset());
                    }
                }}
            >
                <span className="user">
                    {signLogo} <span>{signText}</span>
                </span>
            </Link>
        </nav>
    );

    return content;
}
