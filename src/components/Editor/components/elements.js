import {
  Text,
  Box,
  Code,
  Heading as ChakraHeading,
  useColorMode,
  List as ChakraList,
  ListItem as ChakraListitem,
  chakra,
  Link,
} from "@chakra-ui/react";
import { textColor } from "@styles/colorModeStyles";

const Element = ({ attributes, children, element }) => {
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
        <ChakraList
          key={children}
          color={textColor[colorMode]}
          display="block"
          marginBlockStart="1em"
          marginBlockEnd="1em"
          marginInlineStart="0px"
          paddingInlineStart="40px"
        >
          {children}
        </ChakraList>
      );
    case "list-item":
      return (
        <ChakraListitem listStyleType="disc" fontSize="30px" {...attributes}>
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

    default:
      return (
        <Text key={children} {...attributes}>
          {children}
        </Text>
      );
  }
};

export default Element;
