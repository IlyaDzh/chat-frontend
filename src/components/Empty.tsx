import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import image from "../images/dialogs-empty.png";

interface IEmpty {
    text: string;
    disableImage?: boolean;
}

const useStyles = makeStyles(() => ({
    empty: {
        textAlign: "center"
    },
    emptyImage: {
        marginBottom: "6px"
    }
}));

export const Empty: React.FC<IEmpty> = ({ text, disableImage }) => {
    const classes = useStyles();

    return (
        <div className={classes.empty}>
            {!disableImage && (
                <div className={classes.emptyImage}>
                    <img src={image} alt="" />
                </div>
            )}
            <Typography variant="body2">{text}</Typography>
        </div>
    );
};
