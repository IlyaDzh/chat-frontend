import React from "react";
import clsx from "clsx";
import { Typography, makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";
import { TMessage } from "../../stores/interfaces/IMessageStore";
import { formatDate } from "../../utils/formatDate";
import { TUser } from "../../stores/interfaces/IUserStore";

interface IMessage {
    message: TMessage;
    type: "start" | "middle" | "end";
    currentUser: TUser;
}

const useStyles = makeStyles((theme: Theme) => ({
    message: {
        position: "relative",
        maxWidth: "450px",
        wordBreak: "break-word",
        padding: "6px 46px 6px 16px",
        marginTop: "6px",
        marginRight: "auto",
        boxShadow: "1px 1px 4px 0px rgba(0, 0, 0, 0.1)",
        background: theme.palette.secondary.main
    },
    myMessage: {
        marginLeft: "auto",
        marginRight: "unset",
        background: theme.palette.primary.main
    },
    marginBottom: {
        marginBottom: "12px"
    },
    startMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 30px 0 30px" : "30px 30px 30px 0"
    }),
    middleMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 0 0 30px" : "0 30px 30px 0"
    }),
    endMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 0 0 30px" : "0 30px 30px 0",
        "&::after": {
            content: '""',
            position: "absolute",
            left: isMyMessage ? "unset" : "-14px",
            right: isMyMessage ? "-14px" : "unset",
            bottom: "0px",
            borderTop: "10px solid transparent",
            borderRight: isMyMessage
                ? "none"
                : `14px solid ${theme.palette.secondary.main}`,
            borderLeft: isMyMessage
                ? `14px solid ${theme.palette.primary.main}`
                : "none"
        }
    }),
    messageText: isMyMessage => ({
        color: isMyMessage ? "#fff" : "unset",
        fontWeight: 500
    }),
    messageDate: isMyMessage => ({
        position: "absolute",
        right: "12px",
        bottom: "5px",
        color: isMyMessage ? "#fff" : "unset",
        fontWeight: 500
    }),
    avatar: isMyMessage => ({
        position: "absolute",
        left: isMyMessage ? "unset" : "-50px",
        right: isMyMessage ? "-50px" : "unset",
        bottom: "0"
    })
}));

export const Message: React.FC<IMessage> = ({ message, type, currentUser }) => {
    const isMyMessage: boolean = currentUser.id === message.user.id;

    const classes = useStyles(isMyMessage);

    return (
        <div
            className={clsx(
                classes.message,
                isMyMessage && classes.myMessage,
                type === "start" && classes.startMessage,
                type === "middle" && classes.middleMessage,
                type === "end" && classes.endMessage,
                type === "end" && classes.marginBottom
            )}
        >
            <Typography className={classes.messageText} variant="body1">
                {message.text}
            </Typography>
            <Typography className={classes.messageDate} variant="caption">
                {formatDate(message.updated_at)}
            </Typography>
            {type === "end" && (
                <div className={classes.avatar}>
                    <Avatar
                        src={message.user.avatar || "none"}
                        alt={message.user.name}
                    />
                </div>
            )}
        </div>
    );
};
