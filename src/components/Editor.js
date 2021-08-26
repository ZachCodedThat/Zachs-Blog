import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useColorMode } from "@chakra-ui/react";

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const { colorMode } = useColorMode();

  const color = {
    light: "black",
    dark: "white",
  };

  return (
    <Slate
      color={color[colorMode]}
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        spellCheck="false"
        placeholder="Start typing your post..."
        onKeyDown={(event) => {
          if (event.key === "&") {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("and");
          }
        }}
      />
    </Slate>
  );
};

export default Editor;
