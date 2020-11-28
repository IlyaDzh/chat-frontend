import React from "react";
import { makeStyles } from "@material-ui/core";

import { Dialogs, Messages, CreateGroupModal } from "../components";

const useStyles = makeStyles(() => ({
    chatPage: {
        display: "flex",
        width: "100%"
    }
}));

export const ChatPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.chatPage}>
            <Dialogs />
            <Messages />

            <CreateGroupModal />
        </div>
    );
};
