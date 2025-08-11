"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import axios from "axios";
import { toast } from "sonner";
import { MessageCard } from "@/components/customui/Messagecard";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";

function DashBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  const { data: session } = useSession();
  const { register, watch, setValue } = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const acceptMessages = watch("acceptMessages");

  const handleSwitchChange = async () => {
    try {
      const res = await axios.post("/api/acceptmessages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
    } catch (error) {
      toast.error("Failed to change switch state.");
      console.error("Error changing switch state:", error);
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  const fetchAcceptedMessages = useCallback(async () => {
    setIsSwitched(true);
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/acceptmessages`);
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      toast.error("Failed to fetch accepted messages.");
      console.error("Error fetching accepted messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      try {
        setIsLoading(true);
        setIsSwitched(false);
        const response = await axios.get("/api/getmessages");
        setMessages(response.data);
      } catch (error) {
        toast.error("Failed to fetch messages.");
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
        setIsSwitched(true);
        if (refresh) {
          toast.success("Messages refreshed successfully.");
        }
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (session?.user) {
      fetchAcceptedMessages();
      fetchMessages();
    }
  }, [fetchAcceptedMessages, fetchMessages, session, setValue]);



  console.log("session",session?.user);
  if (!session?.user) {
    
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please log in to access your dashboard
        </h1>
      </div>
    );
  }
  const { username } = session?.user as User;
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const profileUrl = `${baseUrl}/profile/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard!");
  };
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      {/* Copy Profile Link */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      {/* Accept Messages Switch */}
      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>

      <Separator />

      {/* Refresh Button */}
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      {/* Messages List */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
