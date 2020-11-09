import React from "react";
import { inject, observer } from "mobx-react";
import {
    Typography,
    TextField,
    InputAdornment,
    Button,
    makeStyles,
    Theme
} from "@material-ui/core";
import { PersonOutlineOutlined, LockOutlined } from "@material-ui/icons";

import IStores from "../stores/interfaces";
import { ILoginStore } from "../stores/interfaces/ILoginStore";

type IProps = {
    login: ILoginStore;
};

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
    authBtn: {
        marginTop: "25px",
        borderRadius: "30px",
        fontSize: "18px"
    }
}));

const _SignInPage: React.FC<IProps> = ({ login }) => {
    const classes = useStyles();

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
                        value={login.loginForm.name}
                        onChange={event =>
                            login.setLoginFormValue("name", event.target.value)
                        }
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
                        value={login.loginForm.password}
                        onChange={event =>
                            login.setLoginFormValue("password", event.target.value)
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                    <Button
                        className={classes.authBtn}
                        variant="contained"
                        color="primary"
                        onClick={login.doLogin}
                        disabled={login.pending}
                        fullWidth
                        disableElevation
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapMoxToProps = (store: IStores) => ({ login: store.login });

export const SignInPage = inject(mapMoxToProps)(observer(_SignInPage));
