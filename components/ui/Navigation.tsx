'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/lib/types';

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  {
    label: 'Projetos',
    href: '/projetos',
  },
  {
    label: 'Cobranças',
    href: '/cobrancas',
  },
  {
    label: 'Configurações',
    href: '/configuracoes',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:bg-white md:border-r md:border-[#dfe1e6] md:p-6 md:shadow-sm transition-all duration-200">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0079bf] transition-colors duration-200">ArqDesign</h1>
        </div>

        <ul className="space-y-2 flex-1">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-[3px] text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#e4f0f6] text-[#0079bf] border-l-4 border-[#0079bf] shadow-sm'
                    : 'text-[#172b4d] hover:bg-[#091e420a] hover:text-[#172b4d]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dfe1e6] px-4 py-2 shadow-lg transition-all duration-200">
        <ul className="flex justify-around">
          {navigationItems.map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 text-xs font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-[#0079bf]'
                    : 'text-[#5e6c84] hover:text-[#172b4d]'
                }`}
              >
                <div
                  className={`w-6 h-6 mb-1 rounded transition-all duration-200 ${
                    isActive(item.href) ? 'bg-[#0079bf] shadow-md' : 'bg-[#8993a4]'
                  }`}
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}