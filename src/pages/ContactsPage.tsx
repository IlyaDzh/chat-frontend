import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { ContactsHeader, ContactsList } from "../components";

const useStyles = makeStyles((theme: Theme) => ({
    contactsPage: {
        width: "100%",
        padding: "20px",
        background: theme.palette.background.light
    }
}));

export const ContactsPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.contactsPage}>
            <ContactsHeader />
            <ContactsList />
        </div>
    );
};
