'use client';

import * as React from 'react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
} from '@platejs/basic-nodes/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
} from 'lucide-react';

import { MarkToolbarButton } from './mark-toolbar-button';
import { ToolbarGroup, ToolbarSeparator } from './toolbar';
import { FontFamilyToolbarButton } from './font-family-toolbar-button';

export function FloatingToolbarButtons() {
  return (
    <>
      <ToolbarGroup>
        <FontFamilyToolbarButton />
      </ToolbarGroup>
      
      <ToolbarSeparator />
      
      <ToolbarGroup>
        <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
          <Bold className="size-4" />
        </MarkToolbarButton>
        
        <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
          <Italic className="size-4" />
        </MarkToolbarButton>
        
        <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
          <Underline className="size-4" />
        </MarkToolbarButton>
        
        <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+X)">
          <Strikethrough className="size-4" />
        </MarkToolbarButton>
        
        <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
          <Code className="size-4" />
        </MarkToolbarButton>
      </ToolbarGroup>
    </>
  );
}