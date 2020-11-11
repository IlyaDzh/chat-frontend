import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Typography, Badge, makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";

interface IDialog {
    dialog: {
        id: string;
        username: string;
        fullname: string;
        avatar: string;
        lastMessage: string;
        date: string;
        isOnline: boolean;
        unreadCount: number;
    };
    isSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    dialog: {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        backgroundColor: "#fff",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "1px 2px 3px 0px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        transition: "0.2s ease",
        "&:hover": {
            backgroundColor: "#efefef"
        }
    },
    dialogSelected: {
        position: "relative",
        backgroundColor: theme.palette.background.dark,
        "&:hover": {
            backgroundColor: "#383d58"
        },
        "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: theme.palette.primary.main,
            width: "7px"
        }
    },
    dialogAvatar: {
        marginRight: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dialogContent: {
        width: "100%",
        display: "grid"
    },
    dialogHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2px"
    },
    dialogName: isSelected => ({
        color: isSelected && "#f8f8f8"
    }),
    dialogDate: isSelected => ({
        color: !isSelected ? "#565656" : "#dcdcdc"
    }),
    dialogMessage: isSelected => ({
        color: !isSelected ? "#6c6f80" : "#dcdcdc",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        paddingRight: "30px"
    }),
    dialogBadge: {
        width: "100%"
    },
    dialogBadgeCircle: {
        right: "12px",
        bottom: "10px"
    }
}));

export const Dialog: React.FC<IDialog> = ({ dialog, isSelected }) => {
    const classes = useStyles(isSelected);

    return (
        <Link
            to={`/chat?p=${dialog.username}`}
            className={clsx(classes.dialog, isSelected && classes.dialogSelected)}
        >
            <Badge
                classes={{
                    root: classes.dialogBadge,
                    badge: classes.dialogBadgeCircle
                }}
                badgeContent={dialog.unreadCount}
                max={9}
                color="primary"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
            >
                <div className={classes.dialogAvatar}>
                    <Avatar
                        alt={dialog.fullname}
                        src={dialog.avatar}
                        isOnline={dialog.isOnline}
                    />
                </div>
                <div className={classes.dialogContent}>
                    <div className={classes.dialogHeader}>
                        <Typography className={classes.dialogName} variant="h6">
                            {dialog.fullname}
                        </Typography>
                        <Typography className={classes.dialogDate} variant="caption">
                            {dialog.date}
                        </Typography>
                    </div>

                    <Typography className={classes.dialogMessage} variant="body2">
                        {dialog.lastMessage}
                    </Typography>
                </div>
            </Badge>
        </Link>
    );
};
