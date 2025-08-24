'use client';

import type { TPlateEditor, Value } from '@platejs/core';
import { useEditorRef } from '@platejs/core/react';

import { BasicNodesKit } from './basic-nodes-kit';
import { FixedToolbarKit } from './fixed-toolbar-kit';
import { FloatingToolbarKit } from './floating-toolbar-kit';

export const EditorKit = [...BasicNodesKit, ...FixedToolbarKit, ...FloatingToolbarKit];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
