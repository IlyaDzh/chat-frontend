import React, { useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { Typography, Button, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { DialogsTabs } from "./DialogsTabs";
import { DialogsSearch } from "./DialogsSearch";
import { DialogsList } from "./DialogsList";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles((theme: Theme) => ({
    dialogs: {
        background: theme.palette.background.light,
        minWidth: "380px",
        padding: "20px"
    },
    dialogsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    addDialogBtn: {
        borderRadius: "50%",
        height: "42px",
        minWidth: "42px",
        padding: "0"
    }
}));

export const Dialogs: React.FC = () => {
    const classes = useStyles();
    const { type } = useParams<{ type: "direct" | "groups" }>();
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
            <div className={classes.dialogsHeader}>
                <Typography variant="h1">Чаты</Typography>
                <Button
                    className={classes.addDialogBtn}
                    variant="contained"
                    color="primary"
                    disableElevation
                >
                    <Add />
                </Button>
            </div>
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
