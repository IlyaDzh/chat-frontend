import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    messages: {
        width: "100%"
    }
}));

export const Messages: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.messages}>Messages</div>;
};
