import { Icon } from "./components";
import { useSlate } from "slate-react";
import {
  isMarkActive,
  toggleMark,
  toggleBlock,
  isBlockActive,
} from "../editor-utils/toggles";

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Icon
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Icon>
  );
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Icon
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Icon>
  );
};
