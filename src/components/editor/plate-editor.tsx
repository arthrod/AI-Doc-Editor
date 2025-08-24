'use client';

import type { RefObject } from 'react';
import { Editor, EditorContainer } from '@src/components/ui/editor';
import { useEditor } from '@src/components/editor/plugins/editor-kit';

interface PlateEditorProps {
  editorRef?: RefObject<HTMLDivElement>;
}

/**
 * Renders the editor surface and attaches an optional container ref.
 *
 * Calls the editor hook to ensure an existing editor instance is available, then
 * renders an EditorContainer (with `className="editor-inner"`) containing an
 * Editor configured with `variant="fullWidth"`.
 *
 * @param editorRef - Optional ref that will be attached to the editor container DOM element.
 * @returns The editor component tree to be mounted in the React tree.
 */
export function PlateEditor({ editorRef }: PlateEditorProps) {
  // Access existing editor instance
  useEditor();

  return (
    <EditorContainer ref={editorRef} className="editor-inner">
      <Editor variant="fullWidth" />
    </EditorContainer>
  );
}
