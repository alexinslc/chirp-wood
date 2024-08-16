"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import Layout from '../../components/Layout';

export default function ChirpDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, 'posts', params.id));
      if (postDoc.exists()) {
        setPost(postDoc.data());
        console.log("Post data: ", postDoc.data()); // Log the post data
      }
    };

    const unsubscribe = auth?.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("Current User: ", currentUser); // Log the current user
    });

    fetchPost();
    return () => unsubscribe && unsubscribe();
  }, [params.id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this chirp?");
    if (confirmed) {
      await deleteDoc(doc(db, 'posts', params.id));
      router.push('/feed');
    }
  };

  if (!post) {
    return <Layout user={user}><div>Loading...</div></Layout>;
  }

  console.log("Comparing User IDs:", user?.uid, post.uid); // Log the user ID comparison

  return (
    <Layout user={user}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-shire-bark p-6 rounded-lg text-shire-cream">
          <div className="flex items-center mb-4">
            <img src={post.profilePicUrl} alt={post.displayName} className="w-10 h-10 rounded-full mr-4" />
            <p className="font-bold">{post.displayName}</p>
          </div>
          <p className="mb-4">{post.content}</p>
          <p className="text-xs text-shire-cream text-right opacity-75">
            {new Date(post.createdAt?.toDate()).toLocaleString()}
          </p>
          {user?.uid === post.uid && (
            <div className="flex justify-end mt-2 space-x-2">
              <button onClick={() => router.push(`/chirp/${params.id}/edit`)} className="text-xs text-shire-cream underline hover:text-shire-gold">
                Edit
              </button>
              <button onClick={handleDelete} className="text-xs text-red-500 underline hover:text-red-700">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
