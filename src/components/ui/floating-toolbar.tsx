'use client';

import * as React from 'react';
import { useFloatingToolbar, useFloatingToolbarState } from '@platejs/floating';
import { flip, offset, shift } from '@floating-ui/react';
import { cn } from '@src/lib/utils';
import { Toolbar } from './toolbar';

export function FloatingToolbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const state = useFloatingToolbarState({
    floatingOptions: {
      middleware: [
        flip({
          fallbackStrategy: 'initialPlacement',
          padding: 12,
        }),
        offset(12),
        shift({ padding: 12 }),
      ],
      placement: 'top',
    },
  });

  const { props: floatingProps, ref, hidden } = useFloatingToolbar(state);

  if (hidden) return null;

  return (
    <Toolbar
      ref={ref}
      className={cn(
        'absolute z-50 whitespace-nowrap rounded-md border bg-popover px-1 py-1 text-popover-foreground shadow-md',
        className
      )}
      {...floatingProps}
    >
      {children}
    </Toolbar>
  );
}