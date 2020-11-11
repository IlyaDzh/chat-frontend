import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";

const useStyles = makeStyles((theme: Theme) => ({
    messages: {
        width: "100%"
    },
    messagesHeader: {
        padding: "25px"
    },
    messagesList: {

    },
    messagesBottom: {
        padding: "25px"
    }
}));

export const Messages: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.messages}>
        <div className={classes.messagesHeader}>
            <Avatar alt="Taya" src="none" />
        </div>
        <div className={classes.messagesList}>messages list</div>
        <div className={classes.messagesBottom}>input</div>
    </div>;
};
