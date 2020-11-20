import React from "react";
import { observer } from "mobx-react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    makeStyles
} from "@material-ui/core";
import { Photo } from "@material-ui/icons";

import { Loader } from "../Loader";
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
    avatarAttachmentWrapper: {
        position: "relative",
        marginRight: "20px"
    },
    avatarAttachment: {
        width: "80px",
        height: "80px"
    },
    avatarUploadButton: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "50%",
        border: "none",
        background: "rgba(0, 0, 0, 0.6)",
        "&:hover": {
            background: "rgba(0, 0, 0, 0.3)"
        }
    },
    groupNameInput: {
        marginBottom: "10px"
    },
    groupNameInputLabel: {
        fontSize: "15px"
    },
    groupNameInputHelper: {
        fontWeight: 500
    },
    loader: {
        width: "100%",
        marginBottom: "15px"
    }
}));

export const CreateGroupModal: React.FC = observer(() => {
    const classes = useStyles();
    const { createGroupStore } = useStores();
    const {
        createGroupForm,
        avatarObjectUrl,
        createModalIsOpen,
        pending,
        createCroupError,
        setGroupName,
        setGroupAvatar,
        createCroup,
        setCreateModalIsOpen
    } = createGroupStore;

    const handleCloseModal = (): void => {
        setCreateModalIsOpen(false);
    };

    const handleFileAttachment = (files: any): void => {
        if (files && files.length !== 0) {
            setGroupAvatar(files[0]);
        }
    };

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={createModalIsOpen}
            onClose={handleCloseModal}
        >
            <DialogTitle>Создание группы</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <div className={classes.avatarAttachmentWrapper}>
                    <Avatar
                        className={classes.avatarAttachment}
                        src={createGroupForm.avatar ? avatarObjectUrl : undefined}
                    />
                    <Button
                        component="label"
                        variant="outlined"
                        className={classes.avatarUploadButton}
                    >
                        <Photo style={{ color: "#fff" }} />
                        <input
                            type="file"
                            style={{ display: "none" }}
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={event =>
                                handleFileAttachment(event.target.files)
                            }
                        />
                    </Button>
                </div>
                <TextField
                    className={classes.groupNameInput}
                    label="Название группы"
                    value={createGroupForm.name}
                    onChange={e => setGroupName(e.target.value)}
                    error={createCroupError}
                    helperText={createCroupError && "Ошибка создания группы"}
                    InputLabelProps={{
                        classes: { root: classes.groupNameInputLabel }
                    }}
                    FormHelperTextProps={{
                        classes: { root: classes.groupNameInputHelper }
                    }}
                    fullWidth
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                {pending ? (
                    <div className={classes.loader}>
                        <Loader size={40} isCenter />
                    </div>
                ) : (
                    <>
                        <Button color="primary" onClick={handleCloseModal}>
                            Отмена
                        </Button>
                        <Button
                            color="primary"
                            onClick={createCroup}
                            disabled={createGroupForm.name.length === 0}
                        >
                            Создать
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
});
