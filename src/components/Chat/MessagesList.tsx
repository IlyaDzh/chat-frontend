import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { Message } from "./Message";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    messagesList: {
        display: "flex",
        flexDirection: "column-reverse",
        height: "100%",
        padding: "0 62px 20px",
        borderRadius: "30px",
        overflowY: "auto"
    }
}));

export const MessagesList: React.FC = observer(() => {
    const classes = useStyles();
    const { userStore, dialogStore } = useStores();
    const { currentUser } = userStore;
    const { currentDialog } = dialogStore;

    return (
        <div className={classes.messagesList}>
            {currentDialog?.messages.map((message, index) => {
                const prevMessageFromThisUser: boolean =
                    currentDialog?.messages[index + 1]?.user.id === message.user.id;
                const nextMessageFromThisUser: boolean =
                    currentDialog?.messages[index - 1]?.user.id === message.user.id;

                const isStart: boolean =
                    !prevMessageFromThisUser && nextMessageFromThisUser;
                const isMiddle: boolean =
                    prevMessageFromThisUser && nextMessageFromThisUser;

                return (
                    <Message
                        key={message.id}
                        message={message}
                        type={isMiddle ? "middle" : isStart ? "start" : "end"}
                        currentUser={currentUser!}
                    />
                );
            })}
        </div>
    );
});
