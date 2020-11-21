import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import image from "../images/error-page.jpg";

const useStyles = makeStyles(() => ({
    errorPage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center"
    },
    errorImage: {
        maxWidth: "350px",
        margin: "0 auto 20px",
        "& img": {
            width: "100%"
        }
    },
    errorPageTitle: {
        fontWeight: 500,
        marginBottom: "14px"
    }
}));

export const ErrorPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.errorPage}>
            <div>
                <div className={classes.errorImage}>
                    <img src={image} alt="" />
                </div>
                <Typography className={classes.errorPageTitle} variant="h2">
                    Страница в разработке
                </Typography>
                <Typography variant="h4">
                    Скоро все заработает - обязательно возвращайтесь :)
                </Typography>
            </div>
        </div>
    );
};
