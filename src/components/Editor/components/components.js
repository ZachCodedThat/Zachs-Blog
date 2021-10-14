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
        border-bottom: 1px solid #15616d;

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
      light: "primary",
      dark: "secondary",
    };
    const iconBgColor = {
      light: "highlightLight",
      dark: "primary",
    };
    const activeHoverBg = {
      light: "primary",
      dark: "secondary",
    };
    return (
      <IconButton
        {...props}
        ref={ref}
        variant="ghost"
        bg={active ? iconBgColor[colorMode] : "none"}
        color={active ? iconColor[colorMode] : "none"}
        _hover={{ bg: iconBgColor[colorMode], color: activeHoverBg[colorMode] }}
      />
    );
  }
);
