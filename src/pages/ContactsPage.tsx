import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    contactsPage: {}
}));

export const ContactsPage: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.contactsPage}>Контакты</div>;
};
