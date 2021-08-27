import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function Editor({ value, setValue }) {
  const editor = React.useMemo(() => withReact(createEditor()), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        spellCheck="false"
        placeholder="Get to typing"
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
}
