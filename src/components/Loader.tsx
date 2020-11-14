import React from "react";
import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core";
import { ClockLoader } from "react-spinners";

const useStyles = makeStyles(() => ({
    loader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

interface ILoader {
    size: number;
    isCenter?: boolean;
}

export const Loader: React.FC<ILoader> = ({ size = 50, isCenter }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={clsx(isCenter && classes.loader)}>
            <ClockLoader size={size} color={theme.palette.primary.main} />
        </div>
    );
};
