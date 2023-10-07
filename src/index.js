import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

import { database } from "./firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import { setTeam } from "./services/teamSlice";

let currState = store.getState();

// Update firebase realtime database from store
store.subscribe(() => {
    let prevState = currState;
    currState = store.getState();
    if (currState.team.team !== prevState.team.team) {
        set(ref(database, "team/"), {
            team: currState.team.team,
            venue: currState.team.teamVenue,
        });
    }
    if (currState.league.league !== prevState.league.league) {
        set(ref(database, "league/"), {
            league: currState.league.league,
            season: currState.league.season,
        });
    }
});

// Update store from firebase realtime database
const team = ref(database, "team/");
onValue(team, (snapshot) => {
    const data = snapshot.val();
    console.log("From db: " + data);
    store.dispatch(setTeam(data));
});

// Give the whole app access to the store via Redux hooks such as useSelector and useDispatch
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
