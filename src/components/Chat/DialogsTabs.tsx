import React from "react";
import { Typography, Badge, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    dialogsTabs: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    },
    dialogsTabsItem: {
        cursor: "pointer",
        marginRight: "20px",
        paddingRight: "20px"
    },
    dialogsTabsItemBadge: {
        top: "6px"
    }
}));

export const DialogsTabs: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.dialogsTabs}>
            <Badge
                classes={{
                    root: classes.dialogsTabsItem,
                    badge: classes.dialogsTabsItemBadge
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
                    root: classes.dialogsTabsItem,
                    badge: classes.dialogsTabsItemBadge
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
    );
};
