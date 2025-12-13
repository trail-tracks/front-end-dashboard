'use client';

import { EditorState, Klass, LexicalNode } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { useEffect, useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import ToolbarPlugin from './ToolbarPlugin';

const theme = {
  paragraph: 'mb-1',
  text: {
    bold: 'font-bold',
    italic: 'italic',
  },
  list: {
    ul: 'list-disc ml-6',
    ol: 'list-decimal ml-6',
  },
};

const editorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
];

const initialConfig = {
  namespace: 'TrailEditor',
  theme,
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: editorNodes,
};

interface TrailDescriptionEditorProps {
  onChange: (value: string) => void;
  initialValue?: string | null;
}

export function TrailDescriptionEditor({
  onChange,
  initialValue,
}: TrailDescriptionEditorProps) {
  const [initialEditorState, setInitialEditorState] = useState<
    string | null | undefined
  >(initialValue);

  useEffect(() => {
    setInitialEditorState(initialValue);
  }, [initialValue]);

  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const jsonString = JSON.stringify(editorState.toJSON());
      onChange(jsonString);
    });
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...initialConfig,
        editorState: initialEditorState || undefined,
      }}
    >
      <div className="border-2 border-primary-dark rounded-lg outline-none focus-within:ring-2 focus-within:ring-primary-dark/70 transition-shadow">
        <ToolbarPlugin />
        <div className="relative p-3">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="outline-none resize-none text-left min-h-60 md:min-h-96" />
            }
            placeholder={
              <div className="absolute top-3 left-3 text-gray-500 pointer-events-none">
                Digite a descrição detalhada...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <OnChangePlugin onChange={handleEditorChange} />
      <HistoryPlugin />
      <ListPlugin />
    </LexicalComposer>
  );
}
