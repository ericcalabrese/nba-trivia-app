"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    // <header className="border-b border-[#161F22] bg-[#0B1317]/80 backdrop-blur-sm">
    <header>
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-[#E30101] font-bold text-xl tracking-wide">
            <Image src="/logo.png" alt="Ulitmate NBA Trivia" width={125} height={125} />
        </Link>

        <div className="flex items-center gap-6 text-gray-300">
          <Link href="/quiz" className="hover:text-white transition-colors">
            Play
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
