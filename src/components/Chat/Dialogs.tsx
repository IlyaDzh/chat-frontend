import React, { useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core";

import { DialogsHeader } from "./DialogsHeader";
import { DialogsTabs } from "./DialogsTabs";
import { DialogsSearch } from "./DialogsSearch";
import { DialogsList } from "./DialogsList";
import { useStores } from "../../stores/useStore";
import { TDialogsType } from "../../stores/interfaces/IDialogStore";

const useStyles = makeStyles((theme: Theme) => ({
    dialogs: {
        background: theme.palette.background.light,
        maxWidth: "380px",
        width: "100%",
        padding: "20px"
    }
}));

export const Dialogs: React.FC = () => {
    const classes = useStyles();
    const { type } = useParams<{ type: TDialogsType }>();
    const { dialogStore } = useStores();
    const { setCurrentTab, fetchDialogs } = dialogStore;

    useEffect(() => {
        if (type) {
            setCurrentTab(type);
            fetchDialogs();
        }
    }, [type, setCurrentTab, fetchDialogs]);

    return (
        <div className={classes.dialogs}>
            <DialogsHeader />
            <DialogsTabs />
            <DialogsSearch />

            <Switch>
                <Route
                    exact
                    path="/chat/direct"
                    render={() => <DialogsList type="direct" />}
                />
                <Route
                    exact
                    path="/chat/groups"
                    render={() => <DialogsList type="groups" />}
                />
            </Switch>
        </div>
    );
};
