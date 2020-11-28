import React from "react";
import {
    Backdrop as BaseBackdrop,
    useTheme,
    makeStyles,
    Theme
} from "@material-ui/core";
import { ClockLoader } from "react-spinners";

interface IBackdrop {
    loaderSize?: number;
    isTransparent?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: isTransparent => ({
        zIndex: theme.zIndex.drawer + 1,
        background: isTransparent
            ? `rgba(248, 248, 248, 0.4)`
            : theme.palette.background.light
    })
}));

export const Backdrop: React.FC<IBackdrop> = ({
    loaderSize = 70,
    isTransparent = false
}) => {
    const classes = useStyles(isTransparent);
    const theme = useTheme();

    return (
        <BaseBackdrop className={classes.backdrop} transitionDuration={500} open>
            <ClockLoader size={loaderSize} color={theme.palette.primary.main} />
        </BaseBackdrop>
    );
};
