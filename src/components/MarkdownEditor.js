import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const Editor = () => {
  const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false,
  });

  const mdParser = new MarkdownIt();

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }

  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
