import React from "react";
import { Typography, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Add, MoreHoriz, Videocam } from "@material-ui/icons";

import { Avatar } from "../Avatar";
import { TDialog } from "../../stores/interfaces/IDialogStore";

interface IMessagesHeader {
    currentDialog: TDialog;
}

const useStyles = makeStyles((theme: Theme) => ({
    messagesHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
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

export const MessagesHeader: React.FC<IMessagesHeader> = ({ currentDialog }) => {
    const classes = useStyles();

    return (
        <div className={classes.messagesHeader}>
            <div className={classes.messagesHeaderLeft}>
                <Avatar
                    src={currentDialog.avatar}
                    alt={currentDialog.name}
                    size="large"
                >
                    {currentDialog.name && currentDialog.name[0]}
                </Avatar>
                <div className={classes.messagesUserInfo}>
                    <Typography variant="h6">{currentDialog.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {currentDialog.type === 0
                            ? "Был(а) 2 часа назад"
                            : currentDialog.users?.length === 1
                            ? "1 участник"
                            : `${currentDialog.users?.length} участников`}
                    </Typography>
                </div>
            </div>
            <div className={classes.messagesHeaderRight}>
                {currentDialog.type === 1 && (
                    <IconButton className={classes.iconButton}>
                        <Add classes={{ root: classes.iconButtonSvg }} />
                    </IconButton>
                )}
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
