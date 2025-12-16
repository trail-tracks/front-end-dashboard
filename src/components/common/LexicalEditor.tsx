'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';

import { ListItemNode, ListNode } from '@lexical/list';
import { EditorState, ParagraphNode, TextNode } from 'lexical';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import ToolbarPlugin from './LexicalToolbar';

interface Props {
  value: string | undefined | null;
  onChange: (value: string) => void;
}

function InitialStatePlugin({ value }: { value: string | undefined | null }) {
  const [editor] = useLexicalComposerContext();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (value && value.length > 0 && !hasLoadedRef.current) {
      try {
        if (value.trim().startsWith('<')) {
          editor.update(() => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(value, 'text/html');
            const nodes = $generateNodesFromDOM(editor, dom);

            const root = $getRoot();
            root.clear();
            root.select();
            $insertNodes(nodes);
          });
        } else {
          const editorState = editor.parseEditorState(value);
          editor.setEditorState(editorState);
        }
        hasLoadedRef.current = true;
      } catch (error) {
        console.error('Error parsing editor state:', error);
      }
    }
  }, [editor, value]);

  return null;
}

function OnChangeHandlerPlugin({
  onChange,
}: {
  onChange: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const lastValueRef = useRef<string>('');

  const handleChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        if (html !== lastValueRef.current) {
          lastValueRef.current = html;
          onChange(html);
        }
      });
    },
    [editor, onChange],
  );

  return <OnChangePlugin onChange={handleChange} />;
}

const LexicalEditor = memo(function LexicalEditor({ value, onChange }: Props) {
  const editorConfig = useMemo(
    () => ({
      namespace: 'TrailEditor',
      nodes: [ParagraphNode, TextNode, ListNode, ListItemNode],
      theme: {
        paragraph: 'mb-2',
        list: {
          ul: 'list-disc ml-6 my-2',
          ol: 'list-decimal ml-6 my-2',
        },
        listitem: 'p-0 my-1',
        text: {
          bold: 'font-bold',
          italic: 'italic',
          underline: 'underline',
        },
      },
      onError(error: Error) {
        console.error(error);
      },
    }),
    [],
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-md relative">
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-3 min-h-40 focus:outline-none" />
          }
          placeholder={
            <div className="text-gray-400 mt-2 absolute top-14 left-3 pointer-events-none">
              Digite aqui…
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <ListPlugin />
        <OnChangeHandlerPlugin onChange={onChange} />
        <InitialStatePlugin value={value} />
      </div>
    </LexicalComposer>
  );
});

export default LexicalEditor;
