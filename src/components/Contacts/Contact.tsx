import React from "react";
import { Typography, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Message, Phone, Videocam } from "@material-ui/icons";

import { Avatar } from "../Avatar";
import { TUser } from "../../stores/interfaces/IUserStore";

interface IContact {
    contact: TUser;
    handleAvatarClick: () => void;
    handleCreateDirectClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    contact: {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "1px 2px 3px 0px rgba(0, 0, 0, 0.08)",
        overflow: "hidden"
    },
    contactInfo: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
    },
    contactName: {
        marginLeft: "14px"
    },
    contactActions: {
        display: "flex",
        alignItems: "center"
    },
    iconButton: {
        marginLeft: "2px",
        color: theme.palette.text.secondary
    },
    iconButtonSvg: {
        width: "28px",
        height: "28px"
    }
}));

export const Contact: React.FC<IContact> = ({
    contact,
    handleAvatarClick,
    handleCreateDirectClick
}) => {
    const classes = useStyles();

    return (
        <div className={classes.contact}>
            <div className={classes.contactInfo} onClick={handleAvatarClick}>
                <Avatar src={contact.avatar} alt={contact.name}>
                    {contact.name && contact.name[0]}
                </Avatar>
                <Typography className={classes.contactName} variant="h6">
                    {contact.name}
                </Typography>
            </div>
            <div className={classes.contactActions}>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleCreateDirectClick}
                >
                    <Message classes={{ root: classes.iconButtonSvg }} />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <Phone classes={{ root: classes.iconButtonSvg }} />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <Videocam classes={{ root: classes.iconButtonSvg }} />
                </IconButton>
            </div>
        </div>
    );
};
