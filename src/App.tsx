import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import { AppBar } from "./components";
import {
    SignInPage,
    CallHistoryPage,
    ContactsPage,
    ChatPage,
    NotificationsPage,
    SettingsPage
} from "./pages";

const HomeRoutes: React.FC = () => {
    return (
        <section className="home">
            <AppBar />
            <Route exact path="/call-history" component={CallHistoryPage} />
            <Route exact path="/contacts" component={ContactsPage} />
            <Route exact path="/chat" component={ChatPage} />
            <Route exact path="/notifications" component={NotificationsPage} />
            <Route exact path="/settings" component={SettingsPage} />
        </section>
    );
};

export const App: React.FC = () => {
    const isAuthorized = true;

    return (
        <Switch>
            <Route
                exact
                path="/sign-in"
                render={() =>
                    isAuthorized ? <Redirect to="/chat" /> : <SignInPage />
                }
            />
            <Route
                exact
                path={[
                    "/call-history",
                    "/contacts",
                    "/chat",
                    "/notifications",
                    "/settings"
                ]}
                render={() =>
                    isAuthorized ? <HomeRoutes /> : <Redirect to="/sign-in" />
                }
            />
            <Route
                render={() =>
                    isAuthorized ? (
                        <Redirect to="/chat" />
                    ) : (
                        <Redirect to="/sign-in" />
                    )
                }
            />
        </Switch>
    );
};
