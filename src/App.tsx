import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import { AppBar, Backdrop } from "./components";
import { SignInPage, ContactsPage, ChatPage, ErrorPage } from "./pages";
import { useStores } from "./stores/useStore";

const HomeRoutes: React.FC = () => (
    <section className="home">
        <AppBar />
        <Route exact path="/call-history" component={ErrorPage} />
        <Route exact path="/contacts" component={ContactsPage} />
        <Route exact path="/chat/:type" component={ChatPage} />
        <Route exact path="/notifications" component={ErrorPage} />
        <Route exact path="/settings" component={ErrorPage} />
    </section>
);

export const App: React.FC = observer(() => {
    const { userStore } = useStores();
    const { currentUser, pending, fetchUser } = userStore;

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fetchUser();
        }
    }, [fetchUser]);

    if (pending) {
        return <Backdrop />;
    }

    return (
        <Switch>
            <Route
                exact
                path="/sign-in"
                render={() =>
                    currentUser ? <Redirect to="/chat/direct" /> : <SignInPage />
                }
            />
            <Route
                exact
                path={[
                    "/call-history",
                    "/contacts",
                    "/chat/:type",
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
                        <Redirect to="/chat/direct" />
                    ) : (
                        <Redirect to="/sign-in" />
                    )
                }
            />
        </Switch>
    );
});
