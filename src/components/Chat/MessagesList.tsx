import React from "react";
import { makeStyles } from "@material-ui/core";

import { Message } from "./Message";
import { TMessage } from "../../stores/interfaces/IMessageStore";

const useStyles = makeStyles(() => ({
    messagesList: {
        display: "flex",
        flexDirection: "column-reverse",
        height: "100%",
        padding: "0 20px 20px",
        borderRadius: "30px"
    }
}));

const messagesList: TMessage[] = [
    {
        id: 1,
        text: "123",
        date: "07:32",
        user: {
            id: 3,
            name: "max",
            avatar: "none"
        }
    }
];

export const MessagesList: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.messagesList}>
            {messagesList.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};
