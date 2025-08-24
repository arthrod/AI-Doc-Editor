'use client';

import { useCallback, useEffect } from 'react';
import type { Value } from '@platejs/core';
import { Plate, usePlateEditor } from '@platejs/core/react';

import useStore from '@store/store';
import { EditorKit } from '@src/components/editor/plugins/editor-kit';

const EMPTY_VALUE: Value = [{ type: 'p', children: [{ text: '' }] }];

/**
 * Renders a PlateJS rich-text editor tied to the active chat and persists its content to the global chat store.
 *
 * The component initializes editor content from the current chat's `editorState` (falling back to a single empty paragraph if missing or unparseable), updates the editor when the active chat or refresh flag changes, and serializes changes back into the `chats` store. When a persisted editor value changes, the corresponding chat entry's `edited` flag is set to `true`.
 */
export function DocumentPlate({ children }: React.PropsWithChildren) {
  const currentChatIndex = useStore(state => state.currentChatIndex);
  const chats = useStore(state => state.chats);
  const setChats = useStore(state => state.setChats);
  const editorRefresh = useStore(state => state.forceEditorRefresh);

  const loadEditorState = useCallback((): Value => {
    if (!chats || !chats[currentChatIndex]?.editorState) {
      const temp = chats;
      if (temp) {
        temp[currentChatIndex].editorState = JSON.stringify(EMPTY_VALUE);
        setChats(temp);
      }
      return EMPTY_VALUE;
    }

    try {
      return JSON.parse(chats[currentChatIndex].editorState as string) as Value;
    } catch {
      return EMPTY_VALUE;
    }
  }, [chats, currentChatIndex, setChats]);

  const editor = usePlateEditor({ plugins: EditorKit, value: loadEditorState() });

  useEffect(() => {
    editor.tf.setValue(loadEditorState());
  }, [currentChatIndex, editorRefresh, editor, loadEditorState]);

  return (
    <Plate
      editor={editor}
      onValueChange={({ value }) => {
        if (!chats) return;
        const json = JSON.stringify(value);
        const temp = chats;
        if (temp[currentChatIndex].editorState !== json) {
          temp[currentChatIndex].edited = true;
        }
        temp[currentChatIndex].editorState = json;
        setChats(temp);
      }}
    >
      {children}
    </Plate>
  );
}
