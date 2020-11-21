import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import image from "../../images/dialogs-empty.png";

const useStyles = makeStyles(() => ({
    dialogsEmpty: {
        textAlign: "center"
    },
    dialogsEmptyImage: {
        marginBottom: "6px"
    },
    dialogsEmptyText: {}
}));

export const DialogsEmpty: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.dialogsEmpty}>
            <div className={classes.dialogsEmptyImage}>
                <img src={image} alt="" />
            </div>
            <Typography className={classes.dialogsEmptyText} variant="body2">
                Чатов нет
            </Typography>
        </div>
    );
};
