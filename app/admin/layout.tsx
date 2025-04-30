'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, Package, ShoppingCart, Boxes,MessageCircleMore ,Pencil } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/products', label: 'Products', icon: <Package size={18} /> },
    { href: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
    { href: '/admin/allproduct', label: 'All Product', icon: <Boxes size={18} /> },
    { href: '/admin/updatepage', label: 'Update', icon: <Pencil size={18} /> },
    { href: '/admin/massage', label: 'Massage', icon: <MessageCircleMore size={18}/> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>

        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === item.href
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-white border-b shadow-md px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
