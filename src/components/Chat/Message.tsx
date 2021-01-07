import React, { memo } from "react";
import clsx from "clsx";
import { Typography, makeStyles, Theme } from "@material-ui/core";
import { InsertDriveFile as InsertDriveFileIcon } from "@material-ui/icons";

import { Avatar } from "../Avatar";
import { Loader } from "../Loader";
import { TMessage } from "../../stores/interfaces/IMessageStore";
import { formatDate } from "../../utils/formatDate";
import { TUser } from "../../stores/interfaces/IUserStore";
import { bytesToMegaBytes } from "../../utils/formatSize";

interface IMessage {
    message: TMessage;
    type: "start" | "middle" | "end";
    pending?: boolean;
    currentUserId?: number;
    setUserInfoModalIsOpen: (
        userInfoModalIsOpen: boolean,
        user?: TUser | undefined
    ) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    message: {
        position: "relative",
        maxWidth: "450px",
        wordBreak: "break-word",
        padding: "8px 46px 8px 16px",
        marginTop: "5px",
        marginRight: "auto",
        boxShadow: "1px 1px 3px 0px rgba(0, 0, 0, 0.1)",
        background: theme.palette.secondary.main
    },
    myMessage: {
        marginLeft: "auto",
        marginRight: "unset",
        background: theme.palette.primary.main
    },
    imageMessage: {
        background: "transparent !important",
        padding: "0 !important",
        boxShadow: "none !important",
        "&::after": {
            content: "none !important"
        }
    },
    marginBottom: {
        marginBottom: "12px"
    },
    startMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 30px 0 30px" : "30px 30px 30px 0"
    }),
    middleMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 0 0 30px" : "0 30px 30px 0"
    }),
    endMessage: isMyMessage => ({
        borderRadius: isMyMessage ? "30px 0 0 30px" : "0 30px 30px 0",
        "&::after": {
            content: '""',
            position: "absolute",
            left: isMyMessage ? "unset" : "-14px",
            right: isMyMessage ? "-14px" : "unset",
            bottom: "0px",
            borderTop: "10px solid transparent",
            borderRight: isMyMessage
                ? "none"
                : `14px solid ${theme.palette.secondary.main}`,
            borderLeft: isMyMessage
                ? `14px solid ${theme.palette.primary.main}`
                : "none"
        }
    }),
    messageText: isMyMessage => ({
        color: isMyMessage ? "#fff" : "unset",
        fontWeight: 500
    }),
    messageDate: isMyMessage => ({
        position: "absolute",
        right: "12px",
        bottom: "5px",
        color: isMyMessage ? "#fff" : "unset",
        fontWeight: 500
    }),
    avatar: isMyMessage => ({
        cursor: "pointer",
        position: "absolute",
        left: isMyMessage ? "unset" : "-50px",
        right: isMyMessage ? "-50px" : "unset",
        bottom: "0"
    }),
    messageLoader: {
        position: "absolute",
        left: "-20px",
        bottom: 0
    },
    image: {
        width: "100%",
        borderRadius: "18px"
    },
    file: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
    },
    fileIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: theme.palette.background.dark,
        marginRight: "12px"
    },
    fileName: isMyMessage => ({
        color: isMyMessage ? "#fff" : "unset"
    }),
    fileSize: isMyMessage => ({
        color: isMyMessage ? "#fff" : "unset"
    })
}));

export const Message: React.FC<IMessage> = memo(
    ({ message, type, pending, currentUserId, setUserInfoModalIsOpen }) => {
        const isMyMessage: boolean = currentUserId === message.user.id;

        const classes = useStyles(isMyMessage);

        const messageIsImage: boolean = message.file
            ? /[\\/.](gif|jpg|jpeg|webp|tiff|png)$/i.test(message.file.type)
            : false;

        return (
            <div
                className={clsx(
                    classes.message,
                    isMyMessage && classes.myMessage,
                    messageIsImage && classes.imageMessage,
                    type === "start" && classes.startMessage,
                    type === "middle" && classes.middleMessage,
                    type === "end" && classes.endMessage,
                    type === "end" && classes.marginBottom
                )}
            >
                {message.text && (
                    <Typography className={classes.messageText} variant="body1">
                        {message.text}
                    </Typography>
                )}
                {message.file &&
                    (messageIsImage ? (
                        <img
                            className={classes.image}
                            src={URL.createObjectURL(message.file)}
                            alt=""
                        />
                    ) : (
                        <a
                            className={classes.file}
                            href="https://www.google.ru/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className={classes.fileIcon}>
                                <InsertDriveFileIcon color="secondary" />
                            </div>
                            <div>
                                <Typography
                                    variant="body1"
                                    className={classes.fileName}
                                >
                                    {message.file?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.fileSize}
                                >
                                    {bytesToMegaBytes(message.file!.size)}
                                </Typography>
                            </div>
                        </a>
                    ))}
                <Typography className={classes.messageDate} variant="caption">
                    {formatDate(message.updated_at)}
                </Typography>
                {type === "end" && (
                    <div
                        className={classes.avatar}
                        onClick={() => setUserInfoModalIsOpen(true, message.user)}
                    >
                        <Avatar src={message.user.avatar} alt={message.user.name}>
                            {message.user.name[0]}
                        </Avatar>
                    </div>
                )}
                {pending && (
                    <div className={classes.messageLoader}>
                        <Loader size={16} />
                    </div>
                )}
            </div>
        );
    }
);
