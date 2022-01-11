// @refresh reset

import { useCallback, useMemo } from "react";

import isUrl from "is-url";

import { Slate, Editable, withReact, useSlate, useSelected } from "slate-react";
import Element from "./components/elements";
import Leaf from "./components/leafs";
import { BlockButton, MarkButton } from "./components/toggleButtons";
import withShortcuts from "./editor-utils/withShortcut";
import {
  Text,
  createEditor,
  Range,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";

import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import { toggleMark } from "./editor-utils/toggles";

import { Toolbar } from "./components/components";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaHeading,
  FaLink,
  FaUnlink,
} from "react-icons/fa";
import { Icon } from "./components/components";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export default function SlateEditor({ value, setValue }) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withInlines(withShortcuts(withReact(withHistory(createEditor())))),
    []
  );

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon={<FaBold />} />
          <MarkButton format="italic" icon={<FaItalic />} />
          <MarkButton format="underline" icon={<FaUnderline />} />
          <MarkButton format="code" icon={<FaCode />} />
          <BlockButton format="heading-one" icon={<FaHeading />} />
          <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
          <BlockButton format="numbered-list" icon={<FaListOl />} />
          <BlockButton format="bulleted-list" icon={<FaListUl />} />
          <AddLinkButton format="link" icon={<FaLink />} />
          <RemoveLinkButton icon={<FaUnlink />} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          // decorate={decorate}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
          placeholder="Write some markdown..."
          autoFocus
        />
      </Slate>
    </>
  );
}

const withInlines = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ["link"].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const AddLinkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Icon
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      {icon}
    </Icon>
  );
};

const RemoveLinkButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Icon
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        if (isLinkActive(editor, format)) {
          unwrapLink(editor, format);
        }
      }}
    >
      {icon}
    </Icon>
  );
};
