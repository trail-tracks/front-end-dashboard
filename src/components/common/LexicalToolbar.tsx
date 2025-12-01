

"use client";

import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  COMMAND_PRIORITY_CRITICAL, 
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"; 

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";


export default function ToolbarPlugin() {
  
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertList = (listType: "bullet" | "number") => {
    if (listType === "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <div className="flex gap-2 border-b p-2 bg-gray-100">
      {/* Negrito */}
      <button
        type="button"
        className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
        onClick={() => formatText("bold")} 
      >
        <b>B</b>
      </button>

      {/* Itálico */}
      <button
        type="button"
        className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
        onClick={() => formatText("italic")} 
      >
        <i>I</i>
      </button>

      {/* Sublinhado */}
      <button
        type="button"
        className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
        onClick={() => formatText("underline")} 
      >
        <u>U</u>
      </button>

      {/* Lista não ordenada */}
      <button
        type="button"
        className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
        onClick={() => insertList("bullet")} 
      >
        • Lista
      </button>

      {/* Lista numerada */}
      <button
        type="button"
        className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
        onClick={() => insertList("number")} 
      >
        1. Lista
      </button>
    </div>
  );
}