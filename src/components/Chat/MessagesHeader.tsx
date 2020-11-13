import React from "react";
import { Typography, IconButton, makeStyles, Theme } from "@material-ui/core";
import { MoreHoriz, Videocam } from "@material-ui/icons";

import { Avatar } from "../Avatar";

const useStyles = makeStyles((theme: Theme) => ({
    messagesHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "2px solid rgba(0, 0, 0, 0.1)"
    },
    messagesHeaderLeft: {
        display: "flex",
        alignItems: "center"
    },
    messagesHeaderRight: {
        display: "flex",
        alignItems: "center"
    },
    messagesUserInfo: {
        marginLeft: "12px"
    },
    iconButton: {
        marginLeft: "8px",
        color: theme.palette.text.secondary
    },
    iconButtonSvg: {
        width: "28px",
        height: "28px"
    }
}));

export const MessagesHeader: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.messagesHeader}>
            <div className={classes.messagesHeaderLeft}>
                <Avatar alt="Taya" src="none" size="large" isOnline />
                <div className={classes.messagesUserInfo}>
                    <Typography variant="h6">Taya</Typography>
                    <Typography variant="body2" color="textSecondary">
                        В сети 2 часа назад
                    </Typography>
                </div>
            </div>
            <div className={classes.messagesHeaderRight}>
                <IconButton className={classes.iconButton}>
                    <Videocam classes={{ root: classes.iconButtonSvg }} />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <MoreHoriz classes={{ root: classes.iconButtonSvg }} />
                </IconButton>
            </div>
        </div>
    );
};
