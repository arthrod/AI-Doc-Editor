'use client';

import * as React from 'react';
import { cn } from '@src/lib/utils';
import { Toolbar } from './toolbar';

export function FixedToolbar({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      className={cn(
        'sticky top-0 z-50 w-full overflow-x-auto rounded-t-lg border-b border-border bg-background p-1 shadow-sm',
        className
      )}
      {...props}
    />
  );
}