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

import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    dialogPaper: {
        width: "100%",
        maxWidth: "380px"
    },
    dialogContent: {
        display: "flex",
        alignItems: "center"
    },
    userAvatar: {
        marginRight: "16px",
        width: "80px",
        height: "80px"
    },
    userInfoName: {
        marginBottom: "4px"
    }
}));

export const UserInfoModal: React.FC = observer(() => {
    const classes = useStyles();
    const { userInfoModalStore } = useStores();
    const {
        userInfoModalIsOpen,
        currentUserInfo,
        setUserInfoModalIsOpen
    } = userInfoModalStore;

    const handleCloseModal = (): void => {
        setUserInfoModalIsOpen(false);
    };

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={userInfoModalIsOpen}
            onClose={handleCloseModal}
        >
            <DialogTitle>Информация о пользователе</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Avatar className={classes.userAvatar} src={currentUserInfo?.avatar}>
                    {currentUserInfo?.name[0]}
                </Avatar>
                <div>
                    <Typography className={classes.userInfoName} variant="h5">
                        {currentUserInfo?.name}
                    </Typography>
                    <Typography variant="body2">Был(а) сегодня в 16:17</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleCloseModal}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
});
