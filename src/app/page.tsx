import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-shire-gold">Welcome to Chirpwood</h1>
        <p className="mt-4 text-lg text-shire-cream">
          Your custom X clone with a Lord of the Rings twist.
        </p>
        <p className="mt-2 text-md text-shire-cream">
          A peaceful place for thoughts and stories, just like the Shire.
        </p>
        <div className="mt-6">
          <Link href="/login">
            <button className="btn-pill">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
