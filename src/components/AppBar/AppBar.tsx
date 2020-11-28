import React from "react";
import { observer } from "mobx-react";
import { makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";
import { AppBarMenu } from "./AppBarMenu";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        background: theme.palette.background.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    appBarAvatar: {
        padding: "20px"
    },
    appBarAvatarInner: {
        cursor: "pointer"
    }
}));

export const AppBar: React.FC = observer(() => {
    const classes = useStyles();
    const { userStore, userInfoModalStore } = useStores();
    const { currentUser, doLogout } = userStore;
    const { setUserInfoModalIsOpen } = userInfoModalStore;

    return (
        <aside className={classes.appBar}>
            <div className={classes.appBarAvatar}>
                <div
                    className={classes.appBarAvatarInner}
                    onClick={() => setUserInfoModalIsOpen(true, currentUser!)}
                >
                    <Avatar
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        size="large"
                        isOnline
                    >
                        {currentUser?.name[0]}
                    </Avatar>
                </div>
            </div>

            <AppBarMenu doLogout={doLogout} />
        </aside>
    );
});
