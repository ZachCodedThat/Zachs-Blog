import {
  Heading as ChakraHeading,
  useColorMode,
  List as ChakraList,
  ListItem as ChakraListitem,
  chakra,
} from "@chakra-ui/react";

const Element = ({ attributes, children, element }) => {
  const { colorMode } = useColorMode();
  const color = {
    light: "primary",
    dark: "highlight",
  };

  switch (element.type) {
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
          color={color[colorMode]}
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
            color={color[colorMode]}
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
          color={color[colorMode]}
          size="xl"
          lineHeight="2"
          fontWeight="bold"
          {...attributes}
        >
          {children}
        </ChakraHeading>
      );

    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
