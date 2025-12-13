import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import { ListNode, ListItemNode } from '@lexical/list';

import { CodeNode, CodeHighlightNode } from '@lexical/code';

import { LinkNode, AutoLinkNode } from '@lexical/link';

export function lexicalJsonToHtml(jsonString: string): string {
  if (!jsonString) return '';

  const editor = createEditor({
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
    ],
  });

  let html = '';

  const editorState = editor.parseEditorState(jsonString);

  editor.setEditorState(editorState);

  editor.update(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
}
