import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { Dialog } from "./Dialog";

const useStyles = makeStyles(() => ({
    dialogsList: {
        height: "calc(100vh - 197px)",
        overflowY: "auto"
    }
}));

const dialogList = [
    {
        id: "1",
        username: "sophia",
        fullname: "Sophia",
        avatar: "https://i.pravatar.cc/100?u=1",
        lastMessage: "Hi! How are you? I saw that you did it! Congrats!",
        date: "12:21",
        isOnline: false,
        unreadCount: 3
    },
    {
        id: "2",
        username: "taya",
        fullname: "Taya",
        avatar: "https://i.pravatar.cc/100?u=2",
        lastMessage: "ILU <3",
        date: "11:57",
        isOnline: true,
        unreadCount: 0
    },
    {
        id: "3",
        username: "kolya",
        fullname: "Kolya",
        avatar: "https://i.pravatar.cc/100?u=3",
        lastMessage: "lol",
        date: "Вчера",
        isOnline: true,
        unreadCount: 12
    }
];

export const DialogsList: React.FC = () => {
    const classes = useStyles();
    const query = new URLSearchParams(useLocation().search);

    return (
        <div className={classes.dialogsList}>
            {dialogList.map(dialog => (
                <Dialog
                    key={dialog.id}
                    dialog={dialog}
                    isSelected={query.get("p") === dialog.username}
                />
            ))}
        </div>
    );
};
