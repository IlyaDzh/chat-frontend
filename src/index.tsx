import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as MobxProvider } from "mobx-react";
import { MuiThemeProvider } from "@material-ui/core";

import { App } from "./App";
import { stores } from "./stores";
import reportWebVitals from "./reportWebVitals";

import { main } from "./styles/material";
import "./styles/index.scss";

ReactDOM.render(
    <MobxProvider {...stores}>
        <MuiThemeProvider theme={main}>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </MobxProvider>,
    document.getElementById("root")
);

if (localStorage.getItem("accessToken")) {
    stores.user.fetchUser();
}

reportWebVitals();
