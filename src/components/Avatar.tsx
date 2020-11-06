import React from "react";
import {
    Badge,
    Avatar as MaterialAvatar,
    makeStyles,
    withStyles,
    AvatarProps
} from "@material-ui/core";

interface ICustomAvatarProps extends AvatarProps {
    isOnline?: boolean;
    size?: "small" | "large";
}

const useStyles = makeStyles(() => ({
    small: {
        width: "36px",
        height: "36px"
    },
    large: {
        width: "48px",
        height: "48px"
    }
}));

const StyledBadge = withStyles(() => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px #fff`,
        "&::after": {
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge);

export const Avatar: React.FC<ICustomAvatarProps> = ({
    isOnline,
    size,
    ...props
}) => {
    const classes = useStyles();

    return (
        <StyledBadge
            invisible={!isOnline}
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            variant="dot"
        >
            <MaterialAvatar
                className={
                    size === "small"
                        ? classes.small
                        : size === "large"
                        ? classes.large
                        : ""
                }
                {...props}
            />
        </StyledBadge>
    );
};
