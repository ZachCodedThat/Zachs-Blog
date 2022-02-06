// import { Text as ChakraText } from "@chakra-ui/react";
// import escapeHtml from "escape-html";
import { Text } from "slate";
import { textColor } from "@styles/colorModeStyles";
import escapeHtml from "escape-html";
import {
  Text as ChakraText,
  Box,
  Heading as ChakraHeading,
  List as ChakraList,
  ListItem as ChakraListitem,
  useColorMode,
  chakra,
  Link,
  Image as ChakraImage,
} from "@chakra-ui/react";

/* 

The function takes each node from the array of JSON objects returned by the "body" value from the DB and converts it and all children even nested ones according to the
 type value passed by the node to the switch. It takes marks from the text and applies them accordingly as well including overlaps. 
  - Those converted nodes are then returned as an array of JSX elements that is displayed on the screen of the individual posts page. 

  Currently available types: H1-H3, Paragraphs, Bulleted lists / List items, Code, Links and Images 
  Currently available marks: Bold, Italic, Underline and Code

This is not the most efficient way to do this but it is the most straightforward and easy way to be able to adjust minor detials if needed in the future.


TODO: Explore if there is a way to combine the component designs for the Editor and the Post page to make it more efficient.
      - currently the elements for the editor are seperate from the posts page but are the same design.
      - See if I can combine the elements into one file and import it to both the editor and the post page.
*/
const Serialize = (node) => {
  const { colorMode } = useColorMode();

  // Checks for mark types and applies them accordingly.

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

  /* Recursivly calls the function to convert all children nodes 
    nodes and returns a ready to display array of JSX elements in the 
    order they need to be displayed in. */

  const children = node.children.map((n) => Serialize(n));

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
          fontSize={{ base: "3xl", md: "4xl", xl: "6xl" }}
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
          fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
          lineHeight="2"
          fontWeight="bold"
        >
          {children}
        </ChakraHeading>
      );
    case "heading-three":
      return (
        <ChakraHeading
          margin={3}
          key={children}
          as="h3"
          color={textColor[colorMode]}
          fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
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
      return (
        <Link key={children} color="green.400" href={escapeHtml(node.url)}>
          {children}
        </Link>
      );
    case "image":
      return (
        <Box key={children}>
          {children}
          <Box contentEditable={false} position="relative" m={5}>
            <ChakraImage
              src={node.url}
              display="block"
              maxWidth="100%"
              maxHeight="20em"
            />
          </Box>
        </Box>
      );
    default:
      return children;
  }
};

export default Serialize;
