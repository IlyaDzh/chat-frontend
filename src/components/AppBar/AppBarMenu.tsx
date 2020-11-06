import React, { useState } from "react";
import { List, ListItem, ListItemIcon, makeStyles } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 150px)"
    },
    listItemIcon: {
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        height: "40px",
        color: "#686d81"
    }
}));

export const AppBarMenu: React.FC = () => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ): void => {
        setSelectedIndex(index);
    };

    return (
        <nav className={classes.root}>
            <List>
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={event => handleListItemClick(event, 0)}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <CallIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={event => handleListItemClick(event, 1)}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <PeopleAltIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <ChatIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={event => handleListItemClick(event, 3)}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <NotificationsIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
            <List>
                <ListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={event => handleListItemClick(event, 4)}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <SettingsIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
        </nav>
    );
};
