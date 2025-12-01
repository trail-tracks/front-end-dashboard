"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { EditorState, ParagraphNode, TextNode } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";

import ToolbarPlugin from "./LexicalToolbar";

interface Props {
  value: string | undefined | null;
  onChange: (value: string) => void;
}

export default function LexicalEditor({ value, onChange }: Props) {
  const editorConfig = {
    namespace: "TrailEditor",
    nodes: [ParagraphNode, TextNode, ListNode, ListItemNode],
    theme: {
      paragraph: "mb-2",
      list: {
        ul: "list-disc ml-6 my-2",
        ol: "list-decimal ml-6 my-2",
      },
      listitem: "p-0 my-1",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    editorState: value && value.length > 0 ? value : undefined,
    onError(error: Error) {
      console.error(error);
    },
  };

  function handleChange(editorState: EditorState) {
    editorState.read(() => {
      const jsonString = JSON.stringify(editorState.toJSON());
      onChange(jsonString);
    });
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-md relative">
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-3 min-h-40 focus:outline-none" />
          }
          placeholder={
            <div className="text-gray-400 absolute top-14 left-3 pointer-events-none">
              Digite aqui…
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}
