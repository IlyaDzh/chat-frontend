import React from "react";
import { Typography, Button, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { DialogsTabs } from "./DialogsTabs";
import { DialogsSearch } from "./DialogsSearch";
import { DialogsList } from "./DialogsList";

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
            <DialogsList />
        </div>
    );
};
