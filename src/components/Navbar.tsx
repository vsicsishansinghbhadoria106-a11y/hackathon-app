'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Menu,
  Bell,
  Command,
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield,
  Check,
} from 'lucide-react';

export interface NavbarProps {
  onToggleMobile?: () => void;
  isCollapsed?: boolean;
}

export function Navbar({ onToggleMobile, isCollapsed = false }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 text-zinc-100 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Toggle & Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={onToggleMobile}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl border border-zinc-800/90 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input Placeholder */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
              <Search className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, workflows, docs..."
              className="w-full pl-10 pr-14 py-2 text-sm bg-zinc-900/60 hover:bg-zinc-900/80 focus:bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 rounded-xl border border-zinc-800/80 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600/50 shadow-inner transition-all"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded">
                <Command className="w-3 h-3 inline" /> K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Badges, Notifications & Profile Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Environment / Cluster Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>prod-v2</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 rounded-xl border border-zinc-800/80 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-full ring-2 ring-zinc-950 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl shadow-black/80 py-2 z-50 text-zinc-200 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                    Notifications
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    2 new
                  </span>
                </div>
                <div className="divide-y divide-zinc-800/50">
                  <div className="px-4 py-3 hover:bg-zinc-800/40 transition-colors cursor-pointer">
                    <p className="text-xs font-medium text-zinc-200">
                      Deployment successful: v2.4.1
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-zinc-800/40 transition-colors cursor-pointer">
                    <p className="text-xs font-medium text-zinc-200">
                      New team member invited
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-zinc-800/80 hidden sm:block" />

          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800/80 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 group"
              aria-label="User profile menu"
              aria-expanded={profileOpen}
            >
              {/* Metallic Ring Avatar */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-0.5 ring-1 ring-zinc-700/80 group-hover:ring-zinc-500 transition-all shadow-md">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-bold text-zinc-200 tracking-tight">
                    AV
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
              </div>

              {/* User Identity Details */}
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors tracking-tight leading-tight">
                  Alex Vance
                </span>
                <span className="text-[11px] text-zinc-500 font-mono leading-tight">
                  Lead Architect
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl shadow-black/90 p-2 z-50 text-zinc-200 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-zinc-800/80 mb-1">
                  <p className="text-xs font-semibold text-white">Alex Vance</p>
                  <p className="text-[11px] text-zinc-400 font-mono truncate">
                    alex.vance@aethercloud.io
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/90 text-zinc-300 text-[10px] font-mono border border-zinc-700/60">
                    <Shield className="w-3 h-3 text-zinc-400" /> Enterprise Admin
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    Profile Details
                  </Link>

                  <Link
                    href="/billing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                  >
                    <CreditCard className="w-4 h-4 text-zinc-400" />
                    Billing & Plan
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-zinc-400" />
                    Preferences
                  </Link>
                </div>

                <div className="border-t border-zinc-800/80 my-1" />

                <Link
                  href="/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
