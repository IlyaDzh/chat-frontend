import React from "react";
import {
    Backdrop as BaseBackdrop,
    useTheme,
    makeStyles,
    Theme
} from "@material-ui/core";
import { ClockLoader } from "react-spinners";

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.light
    }
}));

export const Backdrop: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <BaseBackdrop className={classes.backdrop} transitionDuration={500} open>
            <ClockLoader size={70} color={theme.palette.primary.main} />
        </BaseBackdrop>
    );
};
