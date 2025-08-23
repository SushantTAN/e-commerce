'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
