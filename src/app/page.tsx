'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutShell } from '@/components/LayoutShell';
import {
  Zap,
  ArrowUpRight,
  TrendingUp,
  Server,
  Shield,
  Activity,
  Cpu,
  LogIn,
  UserPlus,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const metrics = [
    {
      title: 'Total Workloads',
      value: '1,284',
      change: '+14.2%',
      trend: 'up',
      icon: Server,
      desc: 'Active container instances',
    },
    {
      title: 'Avg Latency',
      value: '18.4ms',
      change: '-4.1%',
      trend: 'down',
      icon: Activity,
      desc: 'Global edge response',
    },
    {
      title: 'Security Posture',
      value: '99.9%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      desc: 'Automated policy compliance',
    },
    {
      title: 'GPU Utilization',
      value: '84.6%',
      change: '+8.3%',
      trend: 'up',
      icon: Cpu,
      desc: 'H100 clusters peak',
    },
  ];

  return (
    <LayoutShell>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Hero Banner with Metallic Sheen */}
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          {/* Top specular highlight edge */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-300 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>Next.js App Router • Metallic Dark UI Architecture</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Orchestration Console
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Welcome to your distributed infrastructure workspace. The core UI shell,
                responsive sidebar, top navigation, and authentication flows are active.
              </p>
            </div>

            {/* Quick Auth Links */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-b from-zinc-100 to-zinc-300 text-zinc-950 shadow-md hover:from-white hover:to-zinc-200 active:scale-[0.98] transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Go to Login</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 shadow-sm active:scale-[0.98] transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up Route</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                className="group relative rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 p-5 shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3 h-3 mr-1 inline" />
                    {metric.change}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase font-mono tracking-wider text-zinc-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-white">
                    {metric.value}
                  </p>
                  <p className="text-xs text-zinc-500 font-normal">{metric.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture & Verification Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shell Architecture */}
          <div className="lg:col-span-2 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-zinc-300" />
                <h3 className="font-semibold text-zinc-100 text-sm tracking-tight">
                  Component Architecture Specifications
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">v1.0.0</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <p className="text-xs font-mono font-semibold text-zinc-300">
                  src/components/Sidebar.tsx
                </p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Fixed sidebar, Lucide navigation, collapse toggle, mobile drawer.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <p className="text-xs font-mono font-semibold text-zinc-300">
                  src/components/Navbar.tsx
                </p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Search placeholder, ⌘K badge, profile dropdown & mobile toggle.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <p className="text-xs font-mono font-semibold text-zinc-300">
                  src/components/LayoutShell.tsx
                </p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Responsive dynamic padding, wraps Sidebar & Navbar around children.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-100 text-sm tracking-tight">
                Authentication Routes
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dedicated centered auth pages styled with dark metallic card treatments.
              </p>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/login"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/70 border border-zinc-800/80 hover:border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-all group"
              >
                <span>/login route (Sign In)</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/70 border border-zinc-800/80 hover:border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-all group"
              >
                <span>/signup route (Registration)</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
