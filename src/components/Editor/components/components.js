import React from "react";

import { IconButton, useColorMode } from "@chakra-ui/react";

import { cx, css } from "emotion";

// eslint-disable-next-line react/display-name
export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * + * {
          margin-left: 5px;
        }
      `
    )}
  />
));

// eslint-disable-next-line react/display-name
export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 1px 18px 17px;
        margin: 0 -10px;
        border-bottom: 1px solid #eee;

        margin-bottom: 20px;
      `
    )}
  />
));

// eslint-disable-next-line react/display-name
export const Icon = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => {
    const { colorMode } = useColorMode();

    const iconColor = {
      light: "white",
      dark: "#171717",
    };
    const iconBgColor = {
      light: "primary",
      dark: "highlight",
    };
    const activeHoverBg = {
      light: "highlight",
      dark: "white",
    };
    return (
      <IconButton
        {...props}
        ref={ref}
        variant="ghost"
        bg={active ? iconBgColor[colorMode] : "none"}
        color={active ? iconColor[colorMode] : "none"}
        _hover={{ bg: iconBgColor[colorMode], color: iconColor[colorMode] }}
        _active={{
          color: "white",
        }}
      />
    );
  }
);
