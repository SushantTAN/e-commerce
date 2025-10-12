'use client';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/context/sidebar';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isOpen, close } = useSidebar();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <>
      <div
        className={cn(
          'fixed md:static top-0 left-0 z-40 h-screen bg-white py-4 px-2 flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-15' : 'w-44',
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-3 relative">
          <h1 className="text-lg text-center font-bold text-gray-800 whitespace-nowrap">
            {collapsed ? 'A' : 'Admin'}
          </h1>

          <Button
            variant="default"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto absolute -right-5 top-5 rounded-full p-1 size-6 hidden md:flex"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50'
                )
              }
              onClick={close} // close on mobile when link clicked
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={close}
        />
      )}
    </>
  );
};

export default Sidebar;
