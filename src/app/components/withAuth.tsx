"use client";

import { ComponentType, FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

function withAuth<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): FC<P> {
  return function AuthenticatedComponent(props: P) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          router.push('/login');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return user ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuth;
