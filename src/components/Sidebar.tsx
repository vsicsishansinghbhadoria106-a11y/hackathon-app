'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Layers,
  Activity,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, badge: 'Live' },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Workflows', href: '/workflows', icon: Layers },
  { label: 'Activity', href: '/activity', icon: Activity },
  { label: 'Team', href: '/team', icon: Users },
];

const secondaryNavItems: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Support & Docs', href: '/docs', icon: HelpCircle },
];

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCollapsed = onToggleCollapse !== undefined ? collapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse ?? (() => setInternalCollapsed(!internalCollapsed));

  const renderNavLinks = (items: NavItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;

      return (
        <li key={item.href} className="relative group">
          <Link
            href={item.href}
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-zinc-800/90 via-zinc-800/70 to-zinc-900/50 text-white border border-zinc-700/60 shadow-[0_2px_12px_rgba(0,0,0,0.5)]'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/80'
            } ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            {/* Active metallic indicator bar */}
            {isActive && !isCollapsed && (
              <span className="absolute left-1.5 w-1 h-4 bg-gradient-to-b from-zinc-100 to-zinc-400 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            )}

            <Icon
              className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-200'
              }`}
            />

            {!isCollapsed && (
              <span className="truncate flex-1 tracking-tight">{item.label}</span>
            )}

            {!isCollapsed && item.badge && (
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60 shadow-inner">
                {item.badge}
              </span>
            )}
          </Link>

          {/* Collapsed floating tooltip */}
          {isCollapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-zinc-900 text-zinc-100 text-xs font-medium rounded-lg shadow-xl border border-zinc-700/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-50">
              {item.label}
              {item.badge && (
                <span className="ml-2 text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </li>
      );
    });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800/80 text-zinc-200 select-none">
      {/* Brand Header */}
      <div
        className={`h-16 flex items-center px-4 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md relative ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 rounded-lg"
        >
          {/* Metallic Brand Emblem */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 border border-zinc-600/50 shadow-md group-hover:border-zinc-500 transition-all duration-200">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <Zap className="w-4 h-4 text-zinc-100 drop-shadow" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  AETHER
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 text-zinc-400">
                  OS
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono tracking-tight -mt-0.5">
                Enterprise Cloud
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        {mobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg border border-zinc-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {/* Main section */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase font-mono">
              Workspace
            </div>
          )}
          <ul className="space-y-1.5">{renderNavLinks(mainNavItems)}</ul>
        </div>

        {/* Secondary section */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase font-mono">
              Preferences
            </div>
          )}
          <ul className="space-y-1.5">{renderNavLinks(secondaryNavItems)}</ul>
        </div>
      </div>

      {/* Bottom Metallic Card & Collapse Toggle */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40 space-y-2">
        {!isCollapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/90 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-700/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-zinc-200">System Healthy</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">99.98%</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Cluster US-East-1 running smoothly.
            </p>
          </div>
        )}

        {/* Collapse Toggle Button (Desktop Only) */}
        <button
          type="button"
          onClick={toggleCollapse}
          className={`hidden md:flex items-center gap-2 w-full p-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {!isCollapsed && (
            <span className="text-zinc-400 tracking-tight">Collapse Navigation</span>
          )}
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-zinc-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-zinc-400" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 z-40 transition-[width] duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sliding Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
export default Sidebar;
