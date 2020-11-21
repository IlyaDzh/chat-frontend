import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    messagesEmpty: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    messagesEmptyText: {
        background: "#f8f8f8",
        color: "#1b1b1b",
        padding: "3px 12px",
        borderRadius: "30px",
        boxShadow: "0px 0px 7px -1px rgba(0, 0, 0, 0.35)"
    }
}));

export const MessagesEmpty: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.messagesEmpty}>
            <Typography className={classes.messagesEmptyText} variant="body2">
                Выберите, кому хотели бы написать
            </Typography>
        </div>
    );
};
