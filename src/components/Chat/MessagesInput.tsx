import React from "react";
import { observer } from "mobx-react";
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Typography,
    makeStyles,
    Theme
} from "@material-ui/core";
import { AttachFile, EmojiEmotions, Mic, Send } from "@material-ui/icons";

import { useStores } from "../../stores/useStore";
import { MAX_MESSAGE_COUNT } from "../../utils/constants";

const useStyles = makeStyles((theme: Theme) => ({
    messagesBottom: {
        display: "flex",
        alignItems: "center",
        padding: "12px 15px",
        borderTop: "2px solid rgba(0, 0, 0, 0.1)"
    },
    messagesInput: {
        padding: "0",
        fontSize: "14px",
        fontWeight: 500,
        background: "#f5f5f5",
        "&:hover, &.Mui-focused": {
            background: "#f5f5f5"
        }
    },
    messagesInputInner: {
        padding: "14.5px 0"
    },
    inputSvg: {
        color: theme.palette.text.secondary
    },
    iconBtn: {
        marginLeft: "4px"
    },
    sendMessageBtn: {
        marginLeft: "12px",
        borderRadius: "50%",
        height: "46px",
        minWidth: "46px",
        padding: "0"
    }
}));

export const MessagesInput: React.FC = observer(() => {
    const classes = useStyles();
    const { messageStore } = useStores();
    const { messageText, setMessageText, sendMessage } = messageStore;

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            sendMessage();
        }
    };

    return (
        <div className={classes.messagesBottom}>
            <TextField
                multiline
                rowsMax={3}
                variant="filled"
                placeholder="Написать сообщение..."
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={onKeyDown}
                InputProps={{
                    classes: {
                        root: classes.messagesInput,
                        input: classes.messagesInputInner
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <AttachFile classes={{ root: classes.inputSvg }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Typography variant="h6" color="textSecondary">
                                {messageText.length}/{MAX_MESSAGE_COUNT}
                            </Typography>
                            <IconButton className={classes.iconBtn}>
                                <EmojiEmotions
                                    classes={{ root: classes.inputSvg }}
                                />
                            </IconButton>
                            <IconButton className={classes.iconBtn}>
                                <Mic classes={{ root: classes.inputSvg }} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                fullWidth
            />
            <Button
                className={classes.sendMessageBtn}
                variant="contained"
                color="primary"
                onClick={sendMessage}
                disableElevation
            >
                <Send />
            </Button>
        </div>
    );
});
