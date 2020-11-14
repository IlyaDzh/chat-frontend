import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { MessagesHeader } from "./MessagesHeader";
import { MessagesInput } from "./MessagesInput";
import { useStores } from "../../stores/useStore";

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

export const Messages: React.FC = observer(() => {
    const classes = useStyles();
    const location = useLocation();
    const { dialogStore } = useStores();
    const { pending, currentDialog, setCurrentDialogById } = dialogStore;

    useEffect(() => {
        if (!pending) {
            const queryParams = new URLSearchParams(location.search);
            setCurrentDialogById(queryParams.get("p")!);
        }
    }, [location, pending, setCurrentDialogById]);

    return currentDialog ? (
        <div className={classes.messages}>
            <MessagesHeader currentDialog={currentDialog} />
            <div className={classes.messagesList}>messages list</div>
            <MessagesInput />
        </div>
    ) : (
        <div>Выберите пользователя чтобы начать диалог</div>
    );
});
