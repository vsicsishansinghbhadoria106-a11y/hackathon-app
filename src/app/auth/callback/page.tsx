'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          if (isMounted) setError(sessionError.message);
          return;
        }

        if (data?.session) {
          router.replace('/');
          return;
        }

        // Subscribe to auth state changes to detect session establishment
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session && isMounted) {
            router.replace('/');
          }
        });

        // Fallback redirect after waiting for session exchange
        const timer = setTimeout(() => {
          if (isMounted) {
            router.replace('/');
          }
        }, 2000);

        return () => {
          subscription.unsubscribe();
          clearTimeout(timer);
        };
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Authentication callback failed.');
        }
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
      <div className="rounded-3xl bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/90 p-8 shadow-2xl max-w-sm w-full text-center space-y-4">
        {error ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100">Authentication Failed</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">{error}</p>
            <Link
              href="/login"
              className="inline-block mt-2 py-2 px-4 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              Return to Login
            </Link>
          </>
        ) : (
          <>
            <div className="w-8 h-8 border-2 border-zinc-300 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-base font-semibold text-zinc-200">Completing Sign-In</h2>
            <p className="text-xs text-zinc-400">Please wait while we verify your session...</p>
          </>
        )}
      </div>
    </div>
  );
}
