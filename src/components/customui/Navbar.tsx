"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../retroui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LayoutDashboard, LogIn, LogOut, Plus } from "lucide-react";

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;


  return (
    <nav className="fixed top-0 left-0  w-full z-50 
  bg-white/70 dark:bg-black/40 
  backdrop-blur-md 
  shadow-md 
  text-black dark:text-white 
  p-4 ">
      <div className="   flex flex-row justify-between items-center">

        {/* Logo / Brand */}
        <Link href="/">
          <div className="flex items-center space-x-2 md:mb-0">
            <Avatar className="w-12 h-12 flex justify-center items-center">
              <AvatarImage src="/askly.svg" alt="Askly Logo" />
              <span className="font-bold text-xl">Askly</span>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </Link>

        {/* Session / Auth Buttons */}
        <div className="flex items-center space-x-2">
          {/* Upgrade / Plus */}


          {/* Auth Buttons */}
          {session ? (

            <>
              <Link href="/plans">
                <Button className="flex items-center justify-center space-x-1" variant="outline">
                  <Plus size={16} />
                  <span className="hidden md:inline">Upgrade</span>
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button className="flex items-center justify-center space-x-1" variant="outline">

                  <LayoutDashboard size={16} />

                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Button
                onClick={() => signOut()}
                className="flex items-center justify-center space-x-1 w-full md:w-auto bg-red-600 hover:text-white"
                variant="outline"
              >

                <LogOut size={16} />

                <span className="hidden md:inline">Logout</span>
              </Button></>
          ) : (
            <Link href="/signin">
              <Button className="flex items-center justify-center space-x-1 w-full md:w-auto" variant="outline">

                {/* Use a login icon here, e.g., LogIn from lucide */}
                <LogIn size={16} />

                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>



      </div>
    </nav>
  );
}

export default Navbar;
