'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/commandes', label: 'Commandes', icon: ShoppingCart },
  ];

  return (
    <aside className="w-64 bg-charbon min-h-screen flex flex-col" id="admin-sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-white tracking-wider">
            CURA
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-or">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-cuir text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-white/40 hover:text-white transition-colors mb-2"
        >
          Voir le site →
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-2 text-sm text-white/40 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
