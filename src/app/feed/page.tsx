"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../config/firebase';
import { User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import Link from 'next/link';
import { format } from 'date-fns';
import Chirp from '../chirp/[id]/chirp';

export default function FeedPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<{ id: string; profilePicUrl: string; displayName: string; content: string; createdAt: any; uid: string; }[]>([]);
  const [isChirpOpen, setIsChirpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chirp, setChirp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth?.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setError("You must be logged in to view this page.");
        router.push('/login?error=login_required');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, [router]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        profilePicUrl: doc.data().profilePicUrl,
        displayName: doc.data().displayName,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        uid: doc.data().uid, // Storing UID to check ownership
      }));
      setPosts(postsData);
    });

    return () => unsubscribePosts();
  }, []);

  const handleChirpClick = () => {
    setIsChirpOpen(!isChirpOpen);
    setIsMenuOpen(false); // Close menu if chirp form is opened
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsChirpOpen(false); // Close chirp form if menu is opened
  };

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/login');
    }
  };

  const handleChirpSubmit = async () => {
    if (chirp.trim() === "") return; // Prevent submitting empty chirps

    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        content: chirp,
        displayName: user?.displayName,
        profilePicUrl: user?.photoURL,
        createdAt: serverTimestamp(),
        uid: user?.uid, // Storing UID to check ownership
      });
      setChirp(""); // Clear the chirp text area after submission
      setIsChirpOpen(false); // Close the chirp form after submission
    } catch (error) {
      console.error("Error posting chirp: ", error);
    }
  };

  if (loading) {
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
            src={user?.photoURL || ""}
            alt={user?.displayName || "Profile"}
            className="w-10 h-10 rounded-full"
            onClick={handleMenuClick}
          />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Link href="/account" className="block px-4 py-2 text-sm text-shire-forest hover:bg-shire-sky">
                Account Info
              </Link>
              <Link href="/theme" className="block px-4 py-2 text-sm text-shire-forest hover:bg-shire-sky">
                Theme
              </Link>
              <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-shire-forest hover:bg-shire-sky">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Feed */}
      <div className="flex-grow flex flex-col items-center justify-start p-4">
        <h1 className="text-4xl font-bold text-shire-gold mb-4">The Green Dragon's Bulletin Board</h1>

        <div className="w-full max-w-md">
          {posts.length === 0 ? (
            <p>No chirps yet. Be the first to chirp!</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <Chirp key={post.id} post={post} />
              ))}
            </ul>
          )}
        </div>

        {/* Chirp Button */}
        <button
          onClick={handleChirpClick}
          className="fixed bottom-8 right-8 w-16 h-16 bg-shire-gold text-shire-bark rounded-full flex items-center justify-center text-4xl"
        >
          +
        </button>
        
        {/* Chirp Form */}
        {isChirpOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <textarea
                className="w-full p-2 mb-4 border border-shire-cream rounded-lg bg-white text-shire-bark placeholder-shire-forest"
                value={chirp}
                onChange={(e) => setChirp(e.target.value)}
                placeholder="What's on your mind?"
              />
              <button
                onClick={handleChirpSubmit}
                className="w-full btn-pill"
              >
                Chirp
              </button>
              <button
                onClick={handleChirpClick}
                className="mt-4 text-shire-bark underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
