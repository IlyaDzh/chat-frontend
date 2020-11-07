import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem, ListItemIcon, makeStyles, Theme } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";

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

export const AppBarMenu: React.FC = () => {
    const classes = useStyles();

    return (
        <nav className={classes.root}>
            <List>
                <ListItemLink to="/call-history" icon={<CallIcon />} />
                <ListItemLink to="/contacts" icon={<PeopleAltIcon />} />
                <ListItemLink to="/chat" icon={<ChatIcon />} />
                <ListItemLink to="/notifications" icon={<NotificationsIcon />} />
            </List>
            <List>
                <ListItemLink to="/settings" icon={<SettingsIcon />} />
            </List>
        </nav>
    );
};
