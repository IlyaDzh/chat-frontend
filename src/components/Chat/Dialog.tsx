import React, { memo } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Typography, Badge, makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";
import { TDialog, TDialogsType } from "../../stores/interfaces/IDialogStore";
import { formatDate } from "../../utils/formatDate";

interface IDialog {
    dialog: TDialog;
    lastMessage: string;
    type: TDialogsType;
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
        transition: "0.1s ease",
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

export const Dialog: React.FC<IDialog> = memo(
    ({ dialog, lastMessage, type, isSelected }) => {
        const classes = useStyles(isSelected);

        return (
            <Link
                to={`/chat/${type}?p=${dialog.id}`}
                className={clsx(
                    classes.dialog,
                    isSelected && classes.dialogSelected
                )}
            >
                <Badge
                    classes={{
                        root: classes.dialogBadge,
                        badge: classes.dialogBadgeCircle
                    }}
                    badgeContent={0}
                    max={9}
                    color="primary"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                >
                    <div className={classes.dialogAvatar}>
                        <Avatar
                            src={
                                dialog.type === 0
                                    ? dialog.user?.avatar
                                    : dialog.avatar
                            }
                            alt={dialog.user?.name || dialog.name}
                            isOnline={false}
                        >
                            {dialog.user?.name[0] || (dialog.name && dialog.name[0])}
                        </Avatar>
                    </div>
                    <div className={classes.dialogContent}>
                        <div className={classes.dialogHeader}>
                            <Typography className={classes.dialogName} variant="h6">
                                {dialog.name}
                            </Typography>
                            <Typography
                                className={classes.dialogDate}
                                variant="caption"
                            >
                                {dialog.messages.length > 0
                                    ? formatDate(dialog.messages[0].updated_at)
                                    : ""}
                            </Typography>
                        </div>
                        <Typography
                            className={classes.dialogMessage}
                            variant="body2"
                        >
                            {dialog.messages.length > 0
                                ? lastMessage
                                : "Нет сообщений"}
                        </Typography>
                    </div>
                </Badge>
            </Link>
        );
    }
);
