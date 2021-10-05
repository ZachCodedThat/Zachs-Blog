// import { Text as ChakraText } from "@chakra-ui/react";
// import escapeHtml from "escape-html";
import { Text } from "slate";
import {
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
  const color = {
    light: "primary",
    dark: "highlight",
  };

  const boldRegex = new RegExp("[**][a-zA-Z]+[**]");
  const italicRegex = new RegExp("._[a-zA-Z]+._");

  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold || node.text.match(boldRegex)) {
      string = <strong>{string.replace(/[**]+/g, "")}</strong>;
    } else if (node.code) {
      string = <code>{string}</code>;
    } else if (node.italic || node.text.match(italicRegex)) {
      string = <em>{string.replace(/[_]+/g, "")}</em>;
    } else if (node.underline) {
      string = <u>{string}</u>;
    }
    return string;
  }

  const children = node.children.map((n) => Serialize(n));

  console.log(children);

  switch (node.type) {
    case "bulleted-list":
      return (
        <ChakraList
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
        <ChakraListitem listStyleType="disc" fontSize="20px">
          {children}
        </ChakraListitem>
      );

    case "block-quote":
      return (
        <chakra.blockquote
          borderLeft="2px"
          marginLeft="0"
          marginRight="0"
          paddingLeft="10px"
          color="#aaa"
        >
          {children}
        </chakra.blockquote>
      );

    case "heading-one":
      return (
        <ChakraHeading
          as="h1"
          color={color[colorMode]}
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
          as="h2"
          color={color[colorMode]}
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
          as="h3"
          color={color[colorMode]}
          size="xl"
          lineHeight="2"
          fontWeight="bold"
        >
          {children}
        </ChakraHeading>
      );
    case "paragraph":
      return (
        <chakra.p fontSize="20px" margin="10px 0">
          {children}
        </chakra.p>
      );
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;

    default:
      return children;
  }
};

export default Serialize;
