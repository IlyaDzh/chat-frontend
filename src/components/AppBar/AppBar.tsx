import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles, Theme } from "@material-ui/core";

import { Avatar } from "../Avatar";
import { AppBarMenu } from "./AppBarMenu";
import IStores from "../../stores/interfaces";
import { IUserStore } from "../../stores/interfaces/IUserStore";

interface IAppBarProps {
    user?: IUserStore;
}

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        background: theme.palette.background.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    appBarAvatar: {
        padding: "20px"
    }
}));

const _AppBar: React.FC<IAppBarProps> = ({ user }) => {
    const classes = useStyles();
    const { currentUser, doLogout } = user!;

    return (
        <aside className={classes.appBar}>
            <div className={classes.appBarAvatar}>
                <Avatar
                    alt={currentUser?.name}
                    src={currentUser?.avatar}
                    size="large"
                    isOnline
                />
            </div>

            <AppBarMenu doLogout={doLogout} />
        </aside>
    );
};

const mapMoxToProps = (store: IStores) => ({ user: store.user });

export const AppBar = inject(mapMoxToProps)(observer(_AppBar));
