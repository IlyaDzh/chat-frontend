import React from "react";
import { observer } from "mobx-react";
import {
    Typography,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Theme
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

import { Avatar } from "../Avatar";
import { Loader } from "../Loader";
import { Empty } from "../Empty";
import { useStores } from "../../stores/useStore";
import { TAddUsersItem } from "../../stores/interfaces/IAddUsersToGroupModalStore";

const useStyles = makeStyles((theme: Theme) => ({
    dialogPaper: {
        width: "100%",
        maxWidth: "440px"
    },
    dialogTitle: {
        marginBottom: "12px"
    },
    dialogContent: {
        marginRight: "8px"
    },
    usersSearchInput: {
        fontSize: "14px",
        fontWeight: 500,
        background: "#f5f5f5",
        "&:hover, &.Mui-focused": {
            background: "#f5f5f5"
        }
    },
    searchSvg: {
        color: theme.palette.text.secondary
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
    },
    addUserBtn: {
        borderRadius: "50%",
        height: "30px",
        minWidth: "30px",
        padding: "0"
    }
}));

const UserItem: React.FC<{
    user: TAddUsersItem;
    isDisabled: boolean;
    handleAddClick: (userId: number) => void;
}> = ({ user, isDisabled, handleAddClick }) => {
    const classes = useStyles();

    return (
        <div className={classes.userItem}>
            <div className={classes.userInfo}>
                <Avatar src={user.user.avatar} alt={user.user.name}>
                    {user.user.name && user.user.name[0]}
                </Avatar>
                <Typography className={classes.userInfoName} variant="h6">
                    {user.user.name}
                </Typography>
            </div>
            <div>
                <Button
                    className={classes.addUserBtn}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddClick(user.user.id)}
                    disabled={isDisabled}
                    disableElevation
                >
                    <Add />
                </Button>
            </div>
        </div>
    );
};

export const AddUsersToGroupModal: React.FC = observer(() => {
    const classes = useStyles();
    const { addUsersToGroupModalStore } = useStores();
    const {
        users,
        pending,
        searchText,
        searchUsers,
        addUsersModalIsOpen,
        setAddUsersToGroupModalIsOpen,
        addUserToGroup,
        setSearchText
    } = addUsersToGroupModalStore;

    const handleCloseModal = (): void => {
        setAddUsersToGroupModalIsOpen(false);
    };

    const renderList = (list: TAddUsersItem[]) => {
        return list.map(user => (
            <UserItem
                key={user.user.id}
                user={user}
                isDisabled={user.disabled}
                handleAddClick={addUserToGroup}
            />
        ));
    };

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={addUsersModalIsOpen}
            onClose={handleCloseModal}
        >
            <DialogTitle disableTypography>
                <Typography className={classes.dialogTitle} variant="h6">
                    Добавить пользователей в группу
                </Typography>
                <TextField
                    variant="filled"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    InputProps={{
                        classes: { root: classes.usersSearchInput },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search classes={{ root: classes.searchSvg }} />
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {pending ? (
                    <Loader size={50} isCenter />
                ) : searchText ? (
                    searchUsers.length > 0 ? (
                        renderList(searchUsers)
                    ) : (
                        <Empty text="Пользователей не найдено" disableImage />
                    )
                ) : users.length > 0 ? (
                    renderList(users)
                ) : (
                    <Empty text="Пользователи отсутствуют" disableImage />
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
