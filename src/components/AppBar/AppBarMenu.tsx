import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem, ListItemIcon, makeStyles, Theme } from "@material-ui/core";
import {
    Call,
    PeopleAlt,
    Chat,
    Notifications,
    Settings,
    ExitToApp
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 150px)"
    },
    listItemSelected: {
        overflow: "hidden",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "6px",
            background: theme.palette.primary.main,
            boxShadow: `0px 0px 20px 2px ${theme.palette.primary.main}`
        }
    },
    listItemIcon: {
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        height: "40px",
        color: "#686d81"
    },
    listItemIconSelected: {
        color: "#f8f8f8"
    }
}));

interface IListItemLinkProps {
    to: string;
    icon: React.ReactElement;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon }) => {
    const classes = useStyles();
    const location = useLocation();

    const isSelected = location.pathname === to;

    return (
        <ListItem
            button
            classes={{ selected: classes.listItemSelected }}
            selected={isSelected}
            component={Link}
            to={to}
        >
            <ListItemIcon
                className={clsx(
                    classes.listItemIcon,
                    isSelected && classes.listItemIconSelected
                )}
            >
                {icon}
            </ListItemIcon>
        </ListItem>
    );
};

export const AppBarMenu: React.FC<any> = ({ doLogout }) => {
    const classes = useStyles();

    return (
        <nav className={classes.root}>
            <List>
                <ListItemLink to="/call-history" icon={<Call />} />
                <ListItemLink to="/contacts" icon={<PeopleAlt />} />
                <ListItemLink to="/chat" icon={<Chat />} />
                <ListItemLink to="/notifications" icon={<Notifications />} />
            </List>
            <List>
                <ListItemLink to="/settings" icon={<Settings />} />
                <ListItem button onClick={doLogout}>
                    <ListItemIcon className={clsx(classes.listItemIcon)}>
                        <ExitToApp />
                    </ListItemIcon>
                </ListItem>
            </List>
        </nav>
    );
};
