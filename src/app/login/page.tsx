"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '../config/firebase';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleLogin = async () => {
    await signInWithGoogle();
    router.push('/feed');
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-shire-gold">Login to Chirpwood</h1>
      {error === 'login_required' && (
        <p className="mt-4 text-shire-cream">You must be logged in to view the feed page.</p>
      )}
      <button onClick={handleLogin} className="btn-pill">
        Sign in with Google
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
      <Suspense fallback={<p className="text-shire-cream">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
