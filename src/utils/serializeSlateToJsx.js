import { Text as ChakraText } from "@chakra-ui/react";
// import escapeHtml from "escape-html";
import { Text } from "slate";

// function removeSpecialCharacters(str) {
//   var lower = str.toLowerCase();
//   var upper = str.toUpperCase();

//   var res = "";
//   for (var i = 0; i < lower.length; ++i) {
//     if (lower[i] != upper[i] || lower[i].trim() === "") res += str[i];
//   }
//   return res;
// }

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n));

  // console.log(node.type);

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
