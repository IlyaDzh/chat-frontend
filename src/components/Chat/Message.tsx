import React from "react";
import { Typography, makeStyles, Theme } from "@material-ui/core";

import { TMessage } from "../../stores/interfaces/IMessageStore";

interface IMessage {
    message: TMessage;
}

const useStyles = makeStyles((theme: Theme) => ({
    message: {
        position: "relative",
        background: theme.palette.primary.main,
        padding: "10px 46px 10px 12px",
        maxWidth: "200px",
        width: "100%",
        borderRadius: "30px"
    },
    messageText: {
        color: "#fff",
        fontWeight: 500
    },
    messageDate: {
        position: "absolute",
        right: "12px",
        bottom: "5px",
        color: "#fff",
        fontWeight: 400
    }
}));

export const Message: React.FC<IMessage> = ({ message }) => {
    const classes = useStyles();

    return (
        <div className={classes.message}>
            <Typography className={classes.messageText} variant="body1">
                {message.text}
            </Typography>
            <Typography className={classes.messageDate} variant="caption">
                {message.date}
            </Typography>
        </div>
    );
};
