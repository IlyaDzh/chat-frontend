import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import image from "../../images/dialogs-empty.png";

interface IDialogsEmpty {
    text: string;
    disableImage?: boolean;
}

const useStyles = makeStyles(() => ({
    dialogsEmpty: {
        textAlign: "center"
    },
    dialogsEmptyImage: {
        marginBottom: "6px"
    },
    dialogsEmptyText: {}
}));

export const DialogsEmpty: React.FC<IDialogsEmpty> = ({ text, disableImage }) => {
    const classes = useStyles();

    return (
        <div className={classes.dialogsEmpty}>
            {!disableImage && (
                <div className={classes.dialogsEmptyImage}>
                    <img src={image} alt="" />
                </div>
            )}
            <Typography className={classes.dialogsEmptyText} variant="body2">
                {text}
            </Typography>
        </div>
    );
};
