import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

import { AppBar, Backdrop } from "./components";
import {
    SignInPage,
    CallHistoryPage,
    ContactsPage,
    ChatPage,
    NotificationsPage,
    SettingsPage
} from "./pages";
import IStores from "./stores/interfaces";
import { IUserStore } from "./stores/interfaces/IUserStore";

interface IAppProps {
    user?: IUserStore;
}

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

export const _App: React.FC<IAppProps> = ({ user }) => {
    const { currentUser, pending } = user!;

    if (pending) {
        return <Backdrop />;
    }

    return (
        <Switch>
            <Route
                exact
                path="/sign-in"
                render={() =>
                    currentUser ? <Redirect to="/chat" /> : <SignInPage />
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
                    currentUser ? <HomeRoutes /> : <Redirect to="/sign-in" />
                }
            />
            <Route
                render={() =>
                    currentUser ? (
                        <Redirect to="/chat" />
                    ) : (
                        <Redirect to="/sign-in" />
                    )
                }
            />
        </Switch>
    );
};

const mapMoxToProps = (store: IStores) => ({ user: store.user });

export const App = inject(mapMoxToProps)(observer(_App));
