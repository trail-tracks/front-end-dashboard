'use client';

import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberList, setIsNumberList] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        const listNode = $getNearestNodeOfType(anchorNode, ListNode);
        if ($isListNode(listNode)) {
          const listType = listNode.getListType();
          setIsBulletList(listType === 'bullet');
          setIsNumberList(listType === 'number');
        } else {
          setIsBulletList(false);
          setIsNumberList(false);
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1,
      ),
    );
  }, [editor, updateToolbar]);

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertList = (listType: 'bullet' | 'number') => {
    if (
      (listType === 'bullet' && isBulletList) ||
      (listType === 'number' && isNumberList)
    ) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      if (listType === 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }
    }
  };

  return (
    <div className="flex gap-2 border-b p-2 bg-gray-100">
      {/* Negrito */}
      <button
        type="button"
        className={`px-2 py-1 border rounded transition-colors ${
          isBold
            ? 'bg-primary-dark text-white'
            : 'bg-white text-primary-dark hover:bg-gray-200'
        }`}
        onClick={() => formatText('bold')}
      >
        <b>B</b>
      </button>

      {/* Itálico */}
      <button
        type="button"
        className={`px-2 py-1 border rounded transition-colors ${
          isItalic
            ? 'bg-primary-dark text-white'
            : 'bg-white text-primary-dark hover:bg-gray-200'
        }`}
        onClick={() => formatText('italic')}
      >
        <i>I</i>
      </button>

      {/* Sublinhado */}
      <button
        type="button"
        className={`px-2 py-1 border rounded transition-colors ${
          isUnderline
            ? 'bg-primary-dark text-white'
            : 'bg-white text-primary-dark hover:bg-gray-200'
        }`}
        onClick={() => formatText('underline')}
      >
        <u>U</u>
      </button>

      {/* Lista não ordenada */}
      <button
        type="button"
        className={`px-2 py-1 border rounded transition-colors ${
          isBulletList
            ? 'bg-primary-dark text-white'
            : 'bg-white text-primary-dark hover:bg-gray-200'
        }`}
        onClick={() => insertList('bullet')}
      >
        • Lista
      </button>

      {/* Lista numerada */}
      <button
        type="button"
        className={`px-2 py-1 border rounded transition-colors ${
          isNumberList
            ? 'bg-primary-dark text-white'
            : 'bg-white text-primary-dark hover:bg-gray-200'
        }`}
        onClick={() => insertList('number')}
      >
        1. Lista
      </button>
    </div>
  );
}
