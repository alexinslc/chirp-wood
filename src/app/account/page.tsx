"use client";

import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/login?error=login_required');
      } else {
        setUser(currentUser);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex flex-col">
      {/* Navbar */}
      <nav className="bg-shire-bark px-4 py-2 flex items-center justify-between">
        <Link href="/feed" className="text-shire-gold text-lg font-bold">
          Chirpwood
        </Link>
        <div className="relative">
          <img
            src={user.photoURL || ""}
            alt={user.displayName || "Profile"}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </nav>

      {/* Account Information */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-shire-gold mb-6">Account Information</h1>
        <div className="bg-shire-bark p-6 rounded-lg shadow-lg text-shire-cream w-full max-w-md">
          <div className="mb-4">
            <strong>Display Name:</strong> {user.displayName}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-4">
            <strong>UID:</strong> {user.uid}
          </div>
          <div className="mb-4">
            <img src={user.photoURL || ""} alt="Profile" className="w-20 h-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
