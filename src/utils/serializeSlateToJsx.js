// import { Text as ChakraText } from "@chakra-ui/react";
// import escapeHtml from "escape-html";
import { Text } from "slate";
import { textColor } from "@styles/colorModeStyles";
import {
  Text as ChakraText,
  Box,
  Heading as ChakraHeading,
  List as ChakraList,
  ListItem as ChakraListitem,
  useColorMode,
  chakra,
} from "@chakra-ui/react";

// This function takes each node from the array of object returned by the body value from the DB and converts the all children even nested ones based on the
//  type value passed by the node to the switch.

// It also takes marks from the text and applies them accordingly

const Serialize = (node) => {
  const { colorMode } = useColorMode();

  // const boldRegex = new RegExp("[**][a-zA-Z]+[**]");
  // const italicRegex = new RegExp("._[a-zA-Z]+._");
  // const textRegex = new RegExp("[_*]+[a-zA-Z]+[_*]+");

  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = <strong key={string}>{string}</strong>;
    }

    if (node.code) {
      string = <code key={string}>{string}</code>;
    }
    if (node.italic) {
      string = <em key={string}>{string}</em>;
    }
    if (node.underline) {
      string = <u key={string}>{string}</u>;
    }

    return string;
  }

  const children = node.children.map((n) => Serialize(n));

  // console.log(children);

  switch (node.type) {
    case "code":
      return (
        <Box
          key={children}
          border="2px solid"
          borderColor={textColor[colorMode]}
        >
          <code>{children}</code>
        </Box>
      );
    case "bulleted-list":
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
        <ChakraListitem key={children} listStyleType="disc" fontSize="20px">
          {children}
        </ChakraListitem>
      );

    case "block-quote":
      return (
        <chakra.blockquote
          key={children}
          m={3}
          borderLeft="2px"
          paddingLeft="10px"
          color="#15616D"
        >
          {children}
        </chakra.blockquote>
      );

    case "heading-one":
      return (
        <ChakraHeading
          key={children}
          margin={3}
          as="h1"
          color={textColor[colorMode]}
          size="4xl"
          lineHeight="2"
          fontWeight="bold"
        >
          {children}
        </ChakraHeading>
      );
    case "heading-two":
      return (
        <ChakraHeading
          key={children}
          margin={3}
          as="h2"
          color={textColor[colorMode]}
          size="2xl"
          lineHeight="2"
          fontWeight="bold"
        >
          {children}
        </ChakraHeading>
      );
    case "heading-three":
      return (
        <ChakraHeading
          key={children}
          as="h3"
          color={textColor[colorMode]}
          size="xl"
          lineHeight="2"
          fontWeight="bold"
        >
          {children}
        </ChakraHeading>
      );
    case "paragraph":
      return (
        <ChakraText
          key={children}
          fontSize="20px"
          margin={5}
          color={textColor[colorMode]}
        >
          {children}
        </ChakraText>
      );
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;

    default:
      return children;
  }
};

export default Serialize;
