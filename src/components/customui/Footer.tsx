import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function Footer() {
  const { data: session } = useSession();

  return (
    <div className="text-center py-4 border-t border-gray-200">
      {session?.user ? (
        <p className="text-gray-700">
          Welcome back, <span className="font-medium capitalize text-blue-500">{session.user.username || session.user.email}</span>!
        </p>
      ) : (
        <>
          <p className="text-gray-700 mb-2">
            Want to receive anonymous messages?
          </p>
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create your profile now!
          </Link>
        </>
      )}
    </div>
  );
}

export default Footer;
