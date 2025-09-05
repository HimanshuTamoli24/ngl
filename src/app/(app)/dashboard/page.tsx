"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import axios from "axios";
import { toast } from "sonner";
import { MessageCard } from "@/components/customui/Messagecard";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { Message } from "@/models/user.model";
import Footer from "@/components/customui/Footer";
import { Input } from "@/components/retroui/Input";
import ProfileUrl from "@/components/customui/ProfileUrl";

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
      toast.success(`Accept Messages turned ${!acceptMessages ? "On" : "Off"}`);
    } catch (error) {
      toast.error("Failed to change switch state.");
      console.error(error);
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/getmessages");
        setMessages(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch messages.");
        console.error(error);
      } finally {
        setIsLoading(false);
        if (refresh) toast.success("Messages refreshed successfully.");
      }
    },
    []
  );

  useEffect(() => {
    if (session?.user) {
      fetchAcceptedMessages();
      fetchMessages();
    }
  }, [session, fetchAcceptedMessages, fetchMessages]);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please log in to access your dashboard
        </h1>
      </div>
    );
  }



  return (
    <div className="my-8 mx-4 md:mx-auto max-w-6xl space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        User Dashboard
      </h1>

      {/* Profile Link Card */}
      <Card className="p-4 w-full  " >
        <h2 className="text-lg font-semibold mb-2">Your Unique Link</h2>
        <ProfileUrl classname="w-full "/>
      </Card>

      {/* Accept Messages Card */}
      <Card className="p-4 flex items-center justify-between">
        <span className="font-medium">Accept Messages</span>
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isLoading}
        />
      </Card>

      {/* Refresh Messages */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => fetchMessages(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Messages Grid */}
      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No messages to display.</p>
      )}

      <Separator />

    </div>
  );
}

export default DashBoard;
