'use client';

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-2 border-black bg-white shadow-[4px_4px_0px_black] ">
      <div className="  max-w-6xl mx-auto px-6 py-4 flex  md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <p className="font-bold text-black">
          © {new Date().getFullYear()} Askly
        </p>

        {/* Links */}
        <div className="flex  sm:flex-row gap-2 sm:gap-4 items-center">
          <a
            href="/privacy"
            className="w-full sm:w-auto text-center
               border-0 sm:border-2 sm:border-black
               bg-transparent sm:bg-yellow-300
               px-0 sm:px-3 py-1 font-bold
               shadow-none sm:shadow-[2px_2px_0px_black]
               hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
               transition"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="w-full sm:w-auto text-center
               border-0 sm:border-2 sm:border-black
               bg-transparent sm:bg-yellow-300
               px-0 sm:px-3 py-1 font-bold
               shadow-none sm:shadow-[2px_2px_0px_black]
               hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
               transition"
          >
            Terms
          </a>
        </div>


      </div>
    </footer>

  );
}
