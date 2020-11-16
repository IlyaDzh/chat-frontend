import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "unset"
            },
            containedPrimary: {},
            containedSecondary: {},
            outlinedPrimary: {},
            outlinedSecondary: {},
            outlined: {},
            outlinedSizeSmall: {},
            sizeLarge: {},
            sizeSmall: {},
            textPrimary: {}
        },
        MuiFilledInput: {
            root: {
                borderRadius: "30px",
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px"
            },
            input: {
                padding: "10.5px 20px"
            },
            underline: {
                "&:before, &:after": {
                    content: "unset"
                }
            }
        },
        MuiInputAdornment: {
            filled: {
                "&.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)": {
                    marginTop: 0
                }
            }
        }
    },
    palette: {
        primary: {
            main: "#f45454"
        },
        secondary: {
            main: "#f8f8f8"
        },
        text: {
            primary: "#1b1b1b",
            secondary: "#b5c3c6"
        },
        background: {
            dark: "#2a2f4d",
            light: "#f8f8f8"
        }
    },
    typography: {
        allVariants: {
            color: "#1b1b1b"
        },
        h1: {
            fontSize: "30px",
            fontWeight: "bold"
        },
        h2: {
            fontSize: "26px"
        },
        h3: {
            fontSize: "22px"
        },
        h4: {
            fontSize: "20px"
        },
        h5: {
            fontSize: "18px"
        },
        h6: {
            fontSize: "15px",
            fontWeight: "bold"
        },
        body2: {
            fontSize: "14px",
            fontWeight: 500
        },
        caption: {
            fontSize: "11px",
            fontWeight: 500
        },
        fontFamily: "Open Sans, sans-serif"
    }
});
