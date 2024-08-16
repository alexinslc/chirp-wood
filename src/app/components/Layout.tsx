import Link from 'next/link';

export default function Layout({ children, user }: { children: React.ReactNode, user: { photoURL?: string, displayName?: string } }) {
  return (
    <div className="min-h-screen bg-shire-forest text-shire-cream flex flex-col">
      {/* Navbar */}
      <nav className="bg-shire-bark px-4 py-2 flex items-center justify-between">
        <Link href="/feed" className="text-shire-gold text-lg font-bold">
          Chirpwood
        </Link>
        <div className="relative">
          {/* Assuming `user` state is passed here or handled globally */}
          <img
            src={user?.photoURL || "/path/to/default-profile-pic.jpg"}
            alt={user?.displayName || "Profile"}
            className="w-10 h-10 rounded-full"
          />
          {/* Add your dropdown menu here */}
        </div>
      </nav>
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  );
}
