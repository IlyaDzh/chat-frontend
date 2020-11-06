import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";
import { AppBarMenu } from "./AppBarMenu";

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        background: theme.palette.background.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    appBarAvatar: {
        padding: "22px"
    }
}));

export const AppBar: React.FC = () => {
    const classes = useStyles();

    return (
        <aside className={classes.appBar}>
            <div className={classes.appBarAvatar}>
                <Avatar alt="Ilya D." src="none" size="large" isOnline />
            </div>

            <AppBarMenu />
        </aside>
    );
};
