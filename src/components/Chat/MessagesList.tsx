import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { Message } from "./Message";
import { Loader } from "../Loader";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    messagesList: {
        display: "flex",
        flexDirection: "column-reverse",
        height: "100%",
        padding: "0 62px 20px",
        borderRadius: "30px",
        overflowY: "auto"
    },
    loader: {
        position: "absolute",
        top: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        borderRadius: "50%",
        border: "3px solid #fff",
        boxShadow: "0px 0px 6px -3px #000",
        zIndex: 10
    }
}));

export const MessagesList: React.FC = observer(() => {
    const classes = useStyles();
    const { userStore, dialogStore, userInfoModalStore } = useStores();
    const { currentUser } = userStore;
    const { currentDialog, messagesPending, hasMore, fetchMessages } = dialogStore;
    const { setUserInfoModalIsOpen } = userInfoModalStore;

    useEffect(() => {
        if (currentDialog && currentDialog.messages.length === 1) {
            fetchMessages();
        }
    }, [currentDialog, fetchMessages]);

    const handleScrollList = (e: React.UIEvent<HTMLDivElement>): void => {
        if (e.currentTarget.scrollTop < 160 && hasMore && !messagesPending) {
            fetchMessages();
        }
    };

    return (
        <>
            {messagesPending && (
                <div className={classes.loader}>
                    <Loader size={40} isCenter />
                </div>
            )}
            <div onScroll={handleScrollList} className={classes.messagesList}>
                {currentDialog?.messages.map((message, index) => {
                    const prevMessageFromThisUser: boolean =
                        currentDialog?.messages[index + 1]?.user.id ===
                        message.user.id;
                    const nextMessageFromThisUser: boolean =
                        currentDialog?.messages[index - 1]?.user.id ===
                        message.user.id;

                    const isStart: boolean =
                        !prevMessageFromThisUser && nextMessageFromThisUser;
                    const isMiddle: boolean =
                        prevMessageFromThisUser && nextMessageFromThisUser;

                    return (
                        <Message
                            key={message.id}
                            message={message}
                            type={isMiddle ? "middle" : isStart ? "start" : "end"}
                            pending={message.pending}
                            currentUserId={currentUser?.id}
                            setUserInfoModalIsOpen={setUserInfoModalIsOpen}
                        />
                    );
                })}
            </div>
        </>
    );
});
