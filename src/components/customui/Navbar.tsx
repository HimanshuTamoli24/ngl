"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../retroui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md text-black">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Logo / Brand */}
        <Link href="/">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Avatar className="w-12 h-12 flex justify-center items-center">
              <AvatarImage src="/askly.svg" alt="Askly Logo" />
              <span className="font-bold">Askly</span>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </Link>

        {/* Session / Auth Buttons */}
        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto"
                variant="outline"
              >
                Logout
              </Button>

              {/* User Avatar */}
              {user?.image && (
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.image} alt={user.name || "User"} />
                  <AvatarFallback>
                    {user.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </>
          ) : (
            <Link href="/signin">
              <Button className="w-full md:w-auto" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
