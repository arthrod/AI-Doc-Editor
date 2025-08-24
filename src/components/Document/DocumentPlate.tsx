'use client';

import { useCallback, useEffect } from 'react';
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import useStore from '@store/store';
import { EditorKit } from '@src/components/editor/plugins/editor-kit';

const EMPTY_VALUE: Value = [{ type: 'p', children: [{ text: '' }] }];

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
