'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
