'use client';

import * as React from 'react';
import { useEditorPlugin, useEditorSelector } from '@platejs/core/react';
import { FontFamilyPlugin } from '@platejs/basic-styles/react';
import { ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { ToolbarButton } from './toolbar';

const fontFamilies = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Book Antiqua', label: 'Book Antiqua' },
  { value: 'Bookman Old Style', label: 'Bookman Old Style' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Cambria', label: 'Cambria' },
  { value: 'Century Gothic', label: 'Century Gothic' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Consolas', label: 'Consolas' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
  { value: 'Microsoft Sans Serif', label: 'Microsoft Sans Serif' },
  { value: 'Palatino Linotype', label: 'Palatino Linotype' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Segoe UI', label: 'Segoe UI' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Verdana', label: 'Verdana' },
];

export function FontFamilyToolbarButton() {
  const { editor, api } = useEditorPlugin(FontFamilyPlugin);
  
  const currentFontFamily = useEditorSelector((editor) => {
    const marks = editor.getMarks();
    return marks?.[FontFamilyPlugin.key] as string | undefined;
  }, []);

  const handleFontFamilyChange = (fontFamily: string) => {
    api.mark({ key: FontFamilyPlugin.key, value: fontFamily });
  };

  const handleClearFontFamily = () => {
    api.mark({ key: FontFamilyPlugin.key, clear: true });
  };

  const displayValue = currentFontFamily || 'Font';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          tooltip="Font Family"
          isDropdown
          className="min-w-[120px] justify-between"
        >
          <span className="truncate">{displayValue}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
        <DropdownMenuItem onClick={handleClearFontFamily}>
          Default
        </DropdownMenuItem>
        {fontFamilies.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() => handleFontFamilyChange(font.value)}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}