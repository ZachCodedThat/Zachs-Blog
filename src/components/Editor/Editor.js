import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import {
  Heading as ChakraHeading,
  useColorMode,
  List as ChakraList,
  chakra,
} from "@chakra-ui/react";
import {
  Editor,
  Transforms,
  Range,
  Point,
  createEditor,
  Element as SlateElement,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

export default function SlateEditor({ value, setValue }) {
  const chromeErrorCatch = () => {
    if (!window.chrome) return;
    if (editor.selection == null) return;
    try {
      /**
       * Need a try/catch because sometimes you get an error like:
       *
       * Error: Cannot resolve a DOM node from Slate node: {"type":"p","children":[{"text":"","by":-1,"at":-1}]}
       */
      const domPoint = ReactEditor.toDOMPoint(editor, editor.selection.focus);
      const node = domPoint[0];
      if (node == null) return;
      const element = node.parentElement;
      if (element == null) return;
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) {
      /**
       * Empty catch. Do nothing if there is an error.
       */
    }
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => setValue(value)}
      onSelect={() => {
        chromeErrorCatch;
      }}
    >
      <Editable
        renderElement={renderElement}
        placeholder="Write some markdown..."
        spellCheck
        autoFocus
      />
    </Slate>
  );
}

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          const list = {
            type: "bulleted-list",
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

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
      );
    case "heading-three":
      return (
        <ChakraHeading
          as="h3"
          color={color[colorMode]}
          size="1xl"
          lineHeight="2"
          fontWeight="bold"
          {...attributes}
        >
          {children}
        </ChakraHeading>
      );
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
