import "./App.scss";
import Teams from "./components/teams/teamsPresenter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/homePresenter";
import Players from "./components/players/playersPresenter";
import Scores from "./components/scores/scoresPresenter";
import Standings from "./components/standings/standingsPresenter";
import SignUp from "./components/user/signUp";
import SignIn from "./components/user/signIn";

/* import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; */

export default function App() {
    const content = (
        <>
            <Router>
                <div className="App">
                    <div>
                        <Routes>
                            <Route path="/" element={<Teams />} />
                            <Route path="/choose-team" element={<Teams />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/players" element={<Players />} />
                            <Route path="/scores" element={<Scores />} />
                            <Route path="/standings" element={<Standings />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/sign-in" element={<SignIn />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );

    /*     // TODO this observer and a lot of stuff that has to do with authentication (favorite team and RTK)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // TODO set team to the users favorite team
        } else {
            // User is signed out
            return content;
        }
    }); */

    return content;
}
