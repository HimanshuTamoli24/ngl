"use client";
import React, { useRef } from 'react';
import { Input } from '../retroui/Input';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Button } from '../retroui/Button';

function ProfileUrl({ classname = "" }) {
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!session?.user) return "login";

  const username = session.user.username;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
    }
    toast.success("Profile URL copied!");
  };

  return (
    <div className="flex gap-2 justify-center items-center mt-5">
      <div className={`${classname}`}>
        <Input
          ref={inputRef}
          type="text"
          value={profileUrl}
          readOnly
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
        />
      </div>
      <Button onClick={copyToClipboard}>Copy</Button>
    </div>
  );
}

export default ProfileUrl;
