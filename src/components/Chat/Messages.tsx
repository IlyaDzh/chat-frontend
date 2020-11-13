import React from "react";
import { makeStyles } from "@material-ui/core";

import { MessagesHeader } from "./MessagesHeader";
import { MessagesInput } from "./MessagesInput";

const useStyles = makeStyles(() => ({
    messages: {
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    messagesList: {
        height: "100%"
    }
}));

export const Messages: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.messages}>
            <MessagesHeader />
            <div className={classes.messagesList}>messages list</div>
            <MessagesInput />
        </div>
    );
};
