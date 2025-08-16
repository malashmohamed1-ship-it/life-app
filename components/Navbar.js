// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        LIFE
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/feedback" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold">
          💡 Feedback
        </Link>
      </div>
    </nav>
  );
}
