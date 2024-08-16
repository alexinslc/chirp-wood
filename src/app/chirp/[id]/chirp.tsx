import Link from 'next/link';

export default function Chirp({ post }: { post: any }) {
  return (
    <li className="mb-4 p-4 bg-shire-bark rounded-lg text-shire-cream relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={post.profilePicUrl} alt={post.displayName} className="w-8 h-8 rounded-full mr-2" />
          <p className="font-semibold">{post.displayName}</p>
        </div>
        <Link href={`/chirp/${post.id}`} className="text-sm text-shire-gold">
          View Details
        </Link>
      </div>
      <p className="mt-2">{post.content}</p>
      <p className="text-xs text-shire-cream mt-2 text-right opacity-75">
        {new Date(post.createdAt?.toDate()).toLocaleString()}
      </p>
    </li>
  );
}
