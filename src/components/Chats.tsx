import React from "react";
import {
    Typography,
    Button,
    Badge,
    TextField,
    makeStyles,
    Theme
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    chats: {
        background: theme.palette.background.light,
        minWidth: "380px",
        padding: "20px"
    },
    chatsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    addDialogBtn: {
        borderRadius: "50%",
        height: "42px",
        minWidth: "42px",
        padding: "0"
    },
    chatsTabs: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    },
    chatsTabsItem: {
        cursor: "pointer",
        marginRight: "20px",
        paddingRight: "20px"
    },
    chatsTabsItemBadge: {
        top: "6px"
    },
    chatsList: {}
}));

export const Chats: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.chats}>
            <div className={classes.chatsHeader}>
                <Typography variant="h1">Чаты</Typography>
                <Button
                    className={classes.addDialogBtn}
                    variant="contained"
                    color="primary"
                    disableElevation
                >
                    <Add />
                </Button>
            </div>
            <div className={classes.chatsTabs}>
                <Badge
                    classes={{
                        root: classes.chatsTabsItem,
                        badge: classes.chatsTabsItemBadge
                    }}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    variant="dot"
                    color="primary"
                >
                    <Typography variant="h6">Личные</Typography>
                </Badge>
                <Badge
                    classes={{
                        root: classes.chatsTabsItem,
                        badge: classes.chatsTabsItemBadge
                    }}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    variant="dot"
                    color="primary"
                >
                    <Typography variant="h6" color="textSecondary">
                        Группы
                    </Typography>
                </Badge>
            </div>
            <div className={classes.chatsList}>
                <TextField variant="filled" placeholder="Поиск" fullWidth />
            </div>
        </div>
    );
};
