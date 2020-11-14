import React from "react";
import { observer } from "mobx-react";
import { ClockLoader } from "react-spinners";
import {
    Typography,
    TextField,
    InputAdornment,
    Button,
    makeStyles,
    useTheme,
    Theme
} from "@material-ui/core";
import { PersonOutlineOutlined, LockOutlined } from "@material-ui/icons";

import { useStores } from "../stores/useStore";

const useStyles = makeStyles((theme: Theme) => ({
    auth: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: theme.palette.background.dark
    },
    authHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        backgroundColor: theme.palette.primary.main
    },
    authContent: {
        padding: "40px 50px",
        backgroundColor: "#fff"
    },
    authTitle: {
        fontWeight: "bold",
        color: "#fff"
    },
    authForm: {
        overflow: "hidden",
        width: "500px",
        margin: "10px",
        borderRadius: "16px"
    },
    authInput: {
        marginBottom: "18px"
    },
    authBtnWrapper: {
        position: "relative",
        marginTop: "25px"
    },
    authBtn: {
        borderRadius: "30px",
        fontSize: "18px"
    },
    authLoader: {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translate(-50%, -50%)"
    },
    authErrorText: {
        marginTop: "15px",
        textAlign: "center",
        fontSize: "14px",
        color: "red"
    }
}));

export const SignInPage: React.FC = observer(() => {
    const classes = useStyles();
    const theme = useTheme();
    const { loginStore } = useStores();
    const {
        loginForm,
        loginSubmissionError,
        pending,
        setLoginFormValue,
        doLogin
    } = loginStore;

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            doLogin();
        }
    };

    return (
        <div className={classes.auth}>
            <div className={classes.authForm}>
                <div className={classes.authHeader}>
                    <Typography className={classes.authTitle} variant="h3">
                        Добро пожаловать!
                    </Typography>
                </div>
                <div className={classes.authContent}>
                    <TextField
                        className={classes.authInput}
                        label="Логин"
                        placeholder="Введите ваш логин"
                        value={loginForm.name}
                        onChange={event =>
                            setLoginFormValue("name", event.target.value)
                        }
                        onKeyDown={onKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineOutlined />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                    <TextField
                        className={classes.authInput}
                        type="password"
                        label="Пароль"
                        placeholder="Введите ваш пароль"
                        value={loginForm.password}
                        onChange={event =>
                            setLoginFormValue("password", event.target.value)
                        }
                        onKeyDown={onKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                    <div className={classes.authBtnWrapper}>
                        <Button
                            className={classes.authBtn}
                            variant="contained"
                            color="primary"
                            onClick={doLogin}
                            disabled={pending}
                            fullWidth
                            disableElevation
                        >
                            Войти
                        </Button>
                        {pending && (
                            <div className={classes.authLoader}>
                                <ClockLoader
                                    size={30}
                                    color={theme.palette.primary.main}
                                />
                            </div>
                        )}
                    </div>
                    {loginSubmissionError && (
                        <Typography className={classes.authErrorText}>
                            {loginSubmissionError}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
});
