'use client';

import type { TPlateEditor, Value } from 'platejs';
import { useEditorRef } from 'platejs/react';

import { BasicNodesKit } from './basic-nodes-kit';

export const EditorKit = BasicNodesKit;

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
