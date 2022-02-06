import React from "react";
import {
  toolbarIconColor,
  iconBgColor,
  iconTextHoverColor,
} from "@styles/colorModeStyles";

import { IconButton, useColorMode } from "@chakra-ui/react";

import { cx, css } from "emotion";

// creates the navbar and its buttons/icons this was a bandaid fix for the toolbar I will update these to better use the chakra-ui components.
// This was done so that I could use certain chakra-ui components and access the colorMode to be able to change the color of the buttons along with the theme.

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

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

    return (
      <IconButton
        {...props}
        ref={ref}
        variant="ghost"
        bg={active ? iconBgColor[colorMode] : "none"}
        color={active ? toolbarIconColor[colorMode] : "none"}
        _hover={{
          bg: iconBgColor[colorMode],
          color: iconTextHoverColor[colorMode],
        }}
      />
    );
  }
);
// eslint-disable-next-line react/display-name
export const ImageIcon = React.forwardRef(({ className, ...props }, ref) => (
  <IconButton {...props} ref={ref} variant="ghost" icon="x" />
));
