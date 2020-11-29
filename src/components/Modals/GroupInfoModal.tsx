import React from "react";
import { observer } from "mobx-react";
import {
    Avatar,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles
} from "@material-ui/core";

import { Empty } from "../Empty";
import { TUser } from "../../stores/interfaces/IUserStore";
import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    dialogPaper: {
        width: "100%",
        maxWidth: "380px"
    },
    dialogTitle: {
        marginBottom: "24px"
    },
    groupInfo: {
        display: "flex",
        alignItems: "center"
    },
    groupAvatar: {
        marginRight: "16px",
        width: "80px",
        height: "80px"
    },
    groupInfoName: {
        marginBottom: "4px"
    },
    dialogContent: {
        marginRight: "8px"
    },
    userItem: {
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.08)",
        overflow: "hidden"
    },
    userInfo: {
        display: "flex",
        alignItems: "center"
    },
    userInfoName: {
        marginLeft: "12px"
    }
}));

const UserItem: React.FC<{ user: TUser }> = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.userItem}>
            <div className={classes.userInfo}>
                <Avatar src={user.avatar} alt={user.name}>
                    {user.name && user.name[0]}
                </Avatar>
                <Typography className={classes.userInfoName} variant="h6">
                    {user.name}
                </Typography>
            </div>
        </div>
    );
};

export const GroupInfoModal: React.FC = observer(() => {
    const classes = useStyles();
    const { groupInfoModalStore } = useStores();
    const {
        groupInfoModalIsOpen,
        currentGroupInfo,
        setGroupInfoModalIsOpen
    } = groupInfoModalStore;

    const groupInfo = currentGroupInfo!;

    const handleCloseModal = (): void => {
        setGroupInfoModalIsOpen(false);
    };

    const renderList = (list: TUser[]) =>
        list.map(user => <UserItem key={user.id} user={user} />);

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={groupInfoModalIsOpen}
            onClose={handleCloseModal}
        >
            <DialogTitle disableTypography>
                <Typography className={classes.dialogTitle} variant="h6">
                    Информация о группе
                </Typography>
                <div className={classes.groupInfo}>
                    <Avatar className={classes.groupAvatar} src={groupInfo.avatar}>
                        {groupInfo.name![0]}
                    </Avatar>
                    <div>
                        <Typography className={classes.groupInfoName} variant="h5">
                            {groupInfo.name}
                        </Typography>
                        <Typography variant="body2">
                            {groupInfo.users!.length === 1
                                ? "1 участник"
                                : `${groupInfo.users!.length} участников`}
                        </Typography>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {groupInfo.users!.length > 0 ? (
                    renderList(groupInfo.users!)
                ) : (
                    <Empty text="Пользователей не найдено" disableImage />
                )}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleCloseModal}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
});
