import React, { memo } from "react";
import { Typography, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Add, MoreHoriz, Videocam } from "@material-ui/icons";

import { Avatar } from "../Avatar";
import { TDialog } from "../../stores/interfaces/IDialogStore";
import { useStores } from "../../stores/useStore";

interface IMessagesHeader {
    currentDialog: TDialog;
    dialogLength: number;
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
        cursor: "pointer",
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

export const MessagesHeader: React.FC<IMessagesHeader> = memo(
    ({ currentDialog, dialogLength }) => {
        const classes = useStyles();
        const {
            userInfoModalStore,
            groupInfoModalStore,
            addUsersToGroupModalStore
        } = useStores();
        const { setUserInfoModalIsOpen } = userInfoModalStore;
        const { setGroupInfoModalIsOpen } = groupInfoModalStore;
        const { setAddUsersToGroupModalIsOpen } = addUsersToGroupModalStore;

        return (
            <div className={classes.messagesHeader}>
                <div
                    className={classes.messagesHeaderLeft}
                    onClick={() =>
                        currentDialog.type === 0
                            ? setUserInfoModalIsOpen(true, {
                                  id: currentDialog.id,
                                  avatar: currentDialog.avatar!,
                                  name: currentDialog.name!
                              })
                            : setGroupInfoModalIsOpen(true, currentDialog)
                    }
                >
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
                                : dialogLength === 1
                                ? "1 участник"
                                : `${dialogLength} участников`}
                        </Typography>
                    </div>
                </div>
                <div className={classes.messagesHeaderRight}>
                    {currentDialog.type === 1 && (
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => setAddUsersToGroupModalIsOpen(true)}
                        >
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
    }
);
