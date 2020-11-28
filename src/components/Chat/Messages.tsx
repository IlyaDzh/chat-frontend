import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { MessagesEmpty } from "./MessagesEmpty";
import { MessagesHeader } from "./MessagesHeader";
import { MessagesList } from "./MessagesList";
import { MessagesInput } from "./MessagesInput";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    messages: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
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
            <MessagesHeader
                currentDialog={currentDialog}
                dialogLength={currentDialog.users?.length!}
            />
            <MessagesList />
            <MessagesInput />
        </div>
    ) : (
        <MessagesEmpty />
    );
});
