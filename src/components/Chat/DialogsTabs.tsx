import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Typography, Badge, makeStyles } from "@material-ui/core";

import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    dialogsTabs: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    },
    dialogsTabsLink: {
        textDecoration: "none"
    },
    dialogsTabsItem: {
        marginRight: "20px",
        paddingRight: "20px"
    },
    dialogsTabsItemBadge: {
        top: "6px"
    }
}));

export const DialogsTabs: React.FC = observer(() => {
    const classes = useStyles();
    const { dialogStore } = useStores();
    const { currentTab } = dialogStore;

    return (
        <div className={classes.dialogsTabs}>
            <Link to="/chat/direct" className={classes.dialogsTabsLink}>
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
                    invisible
                >
                    <Typography
                        variant="h6"
                        color={
                            currentTab === "direct" ? "textPrimary" : "textSecondary"
                        }
                    >
                        Личные
                    </Typography>
                </Badge>
            </Link>
            <Link to="/chat/groups" className={classes.dialogsTabsLink}>
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
                    invisible
                >
                    <Typography
                        variant="h6"
                        color={
                            currentTab === "groups" ? "textPrimary" : "textSecondary"
                        }
                    >
                        Группы
                    </Typography>
                </Badge>
            </Link>
        </div>
    );
});
