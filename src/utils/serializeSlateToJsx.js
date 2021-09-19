// import { Text as ChakraText } from "@chakra-ui/react";
// import escapeHtml from "escape-html";
import { Text } from "slate";

// This function takes each node from the array of object returned by the body value from the DB and converts the all children even nested ones based on the
//  type value passed by the node to the switch.

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n));

  console.log(node);

  switch (node.type) {
    case "bulleted-list":
      return <li>{[children]}</li>;

    case "block-quote":
      return <blockquote> {children} </blockquote>;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "heading-one":
      return <h1>{children}</h1>;
    case "paragraph":
      return <p>{children}</p>;

    default:
      return children;
  }
};

export default serialize;
