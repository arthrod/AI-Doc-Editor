'use client';

import type { RefObject } from 'react';
import { Editor, EditorContainer } from '@src/components/ui/editor';
import { useEditor } from '@src/components/editor/plugins/editor-kit';

interface PlateEditorProps {
  editorRef?: RefObject<HTMLDivElement>;
}

export function PlateEditor({ editorRef }: PlateEditorProps) {
  // Access existing editor instance
  useEditor();

  return (
    <EditorContainer ref={editorRef} className="editor-inner">
      <Editor variant="fullWidth" />
    </EditorContainer>
  );
}
