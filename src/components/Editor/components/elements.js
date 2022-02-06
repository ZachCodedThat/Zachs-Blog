import {
  Text,
  Box,
  Code,
  Heading as ChakraHeading,
  useColorMode,
  List as ChakraList,
  ListItem as ChakraListitem,
  OrderedList,
  chakra,
  Link,
  // IconButton,
  // Button,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { textColor } from "@styles/colorModeStyles";

import { ImageIcon, Button } from "./components";

import { Transforms } from "slate";
import {
  useSelected,
  useFocused,
  useSlateStatic,
  ReactEditor,
} from "slate-react";

const Element = ({ attributes, children, element }) => {
  // const props = { attributes, children, element };
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();

  const { colorMode } = useColorMode();

  switch (element.type) {
    case "code":
      return (
        <Box overflowY="scroll">
          <Code {...attributes}>{children}</Code>
        </Box>
      );
    case "block-quote":
      return (
        <chakra.blockquote
          borderLeft="2px"
          marginLeft="0"
          marginRight="0"
          paddingLeft="10px"
          color="#aaa"
          {...attributes}
        >
          {children}
        </chakra.blockquote>
      );
    case "bulleted-list":
      return (
        <ChakraList
          display="block"
          marginBlockStart="1em"
          marginBlockEnd="1em"
          marginInlineStart="0px"
          paddingInlineStart="40px"
          listStyleType="disc"
          {...attributes}
        >
          {children}
        </ChakraList>
      );
    case "numbered-list":
      return (
        <OrderedList
          key={children}
          color={textColor[colorMode]}
          display="block"
          marginBlockStart="1em"
          marginBlockEnd="1em"
          marginInlineStart="0px"
          paddingInlineStart="40px"
          listStyleType="number"
        >
          {children}
        </OrderedList>
      );
    case "list-item":
      return (
        <ChakraListitem listStyleType="disc" fontSize="20px" {...attributes}>
          {children}
        </ChakraListitem>
      );
    case "heading-one":
      return (
        <ChakraHeading
          as="h1"
          color={textColor[colorMode]}
          size="4xl"
          lineHeight="2"
          fontWeight="bold"
          {...attributes}
        >
          {children}
        </ChakraHeading>
      );
    case "heading-two":
      return (
        <>
          <ChakraHeading
            as="h2"
            color={textColor[colorMode]}
            size="3xl"
            lineHeight="2"
            fontWeight="bold"
            {...attributes}
          >
            {children}
          </ChakraHeading>
        </>
      );
    case "heading-three":
      return (
        <ChakraHeading
          as="h3"
          color={textColor[colorMode]}
          size="xl"
          lineHeight="2"
          fontWeight="bold"
          {...attributes}
        >
          {children}
        </ChakraHeading>
      );
    case "link":
      return (
        <Link color="green.400" {...attributes} href={element.url}>
          {children}
        </Link>
      );
    case "image":
      return (
        <Box {...attributes}>
          {children}
          <Box contentEditable={false} position="relative">
            <ChakraImage
              src={element.url}
              display="block"
              maxWidth="100%"
              maxHeight="20em"
              boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
            />
            <Button
              active
              onClick={() => Transforms.removeNodes(editor, { at: path })}
              display={selected && focused ? "inline" : "none"}
              position="absolute"
              top="0.5em"
              left="0.5em"
              bg="white"
            ></Button>
          </Box>
          {children}
        </Box>
      );
    default:
      return (
        <Text key={children} {...attributes}>
          {children}
        </Text>
      );
  }
};

export default Element;

// TODO: Get delete image button working and figure
// out how break some of this stuff out.
