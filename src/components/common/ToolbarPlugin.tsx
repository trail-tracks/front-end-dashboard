import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { FaBold, FaItalic, FaListUl, FaListOl } from "react-icons/fa";

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [listType, setListType] = useState<"ul" | "ol" | null>(null);

  // updateToolbar não depende diretamente da variável `editor` — usa seleção global do Lexical
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));

      const node = selection.getNodes()[0];
      const parent = node.getParent();

      if ($isListNode(parent)) {
        setListType(parent.getTag() === "ul" ? "ul" : "ol");
      } else {
        setListType(null);
      }
    } else {
      setListType(null);
      setIsBold(false);
      setIsItalic(false);
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);

  const toggleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const toggleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const toggleList = (type: "ul" | "ol") => {
    if (listType === type) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(
        type === "ul"
          ? INSERT_UNORDERED_LIST_COMMAND
          : INSERT_ORDERED_LIST_COMMAND,
        undefined,
      );
    }
  };

  const getButtonStyle = (isActive: boolean) =>
    `p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-primary-dark text-white"
        : "bg-white text-primary-dark hover:bg-gray-200"
    }`;

  return (
    <div className="flex gap-1 p-1 border-b border-primary-dark/20">
      <button
        onClick={toggleBold}
        className={getButtonStyle(isBold)}
        type="button"
        title="Negrito"
      >
        <FaBold />
      </button>
      <button
        onClick={toggleItalic}
        className={getButtonStyle(isItalic)}
        type="button"
        title="Itálico"
      >
        <FaItalic />
      </button>
      <button
        onClick={() => toggleList("ul")}
        className={getButtonStyle(listType === "ul")}
        type="button"
        title="Lista de Marcadores"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => toggleList("ol")}
        className={getButtonStyle(listType === "ol")}
        type="button"
        title="Lista Numerada"
      >
        <FaListOl />
      </button>
    </div>
  );
}

export default ToolbarPlugin;
