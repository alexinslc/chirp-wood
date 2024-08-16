"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '../config/firebase';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleLogin = async () => {
    await signInWithGoogle();
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-shire-gold">Login to Chirpwood</h1>
        {error === 'login_required' && (
          <p className="mt-4 text-shire-cream">You must be logged in to view the feed page.</p>
        )}
        <button onClick={handleLogin} className="btn-pill">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
