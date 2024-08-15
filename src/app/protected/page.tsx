"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setError("You must be logged in to view this page.");
        router.push('/login?error=login_required');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
      {error ? (
        <p className="text-shire-gold">{error}</p>
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-bold">Welcome, {user?.displayName}</h1>
          <p className="mt-4">This is a protected page.</p>
          <button onClick={handleSignOut} className="btn-pill">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
