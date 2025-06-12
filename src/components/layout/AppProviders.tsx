"use client";

import { WishlistProvider } from '@/contexts/WishlistContext';
import type { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WishlistProvider>
      {children}
    </WishlistProvider>
  );
}
