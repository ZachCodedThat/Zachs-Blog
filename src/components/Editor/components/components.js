import React from "react";
import {
  toolbarIconColor,
  iconBgColor,
  iconTextHoverColor,
} from "@styles/colorModeStyles";

import { FaDelete } from "react-icons/fa";
import { Transforms } from "slate";
import {
  useSelected,
  useFocused,
  useSlateStatic,
  ReactEditor,
} from "slate-react";

import {
  IconButton,
  useColorMode,
  Box,
  Image as ChakraImage,
} from "@chakra-ui/react";

import { cx, css } from "emotion";
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

// export default function ImageElement({ attributes, children, element }) {
//   const editor = useSlateStatic();
//   const path = ReactEditor.findPath(editor, element);

//   const selected = useSelected();
//   const focused = useFocused();

//   const removeNodes = () => Transforms.removeNodes(editor, { at: path });

//   console.log(props);
//   return (
//     <Box {...attributes}>
//       {children}
//       <Box contentEditable={false} position="relative">
//         <ChakraImage
//           src={element.url}
//           display="block"
//           maxWidth="100%"
//           maxHeight="20em"
//           boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
//         />
//         <Button
//           active
//           onClick={removeNodes}
//           display={selected && focused ? "inline" : "none"}
//           position="absolute"
//           top="0.5em"
//           left="0.5em"
//           bg="white"
//         >

//         </Button>
//       </Box>
//     </Box>
//   );
// }
