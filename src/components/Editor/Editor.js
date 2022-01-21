// @refresh reset

import { useCallback, useMemo } from "react";

import isUrl from "is-url";
import imageExtensions from "image-extensions";

import {
  Slate,
  Editable,
  withReact,
  useSlate,
  useSlateStatic,
  ReactEditor,
} from "slate-react";

import Element from "./components/elements";
import Leaf from "./components/leafs";
import { BlockButton, MarkButton } from "./components/toggleButtons";
import withShortcuts from "./editor-utils/withShortcut";
import {
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
  FaImage,
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
    () =>
      withImages(
        withInlines(withShortcuts(withReact(withHistory(createEditor()))))
      ),
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
          <InsertImageButton format="image" icon={<FaImage />} />
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

// INSERTING IMAGES
// TODO: break out Image and link logic into separate components
// TODO: Document those components

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const InsertImageButton = ({ icon, format }) => {
  const editor = useSlateStatic();
  return (
    <Icon
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        insertImage(editor, url);
      }}
    >
      {icon}
    </Icon>
  );
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
