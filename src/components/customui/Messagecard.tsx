"use client";

import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Trash } from "lucide-react";
import { Card } from "../retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { toast } from "sonner";
import { Message } from "@/models/user.model";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message & { status?: "success" | "info" | "error" | "warning" };
  onMessageDelete: (messageId: string) => void;
  index: number;

};

export function MessageCard({ message, onMessageDelete, index }: MessageCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete<ApiResponse>(`/api/deletemessage/${message._id}`);
      console.log("res", response);

      toast.success(response.data.message || "Message deleted successfully");
      onMessageDelete(message._id as string);
      setIsDetailOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to delete message");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Optional: Status colors
  const statusColors = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      {/* Card as trigger */}
      <Dialog.Trigger asChild>
  <Card className="flex flex-col h-fit max-h-48 overflow-hidden justify-between p-4 shadow-lg hover:shadow-xl transition-shadow rounded-lg cursor-pointer">
    <div className="flex flex-col gap-2">
      {/* Row with serial number + content */}
      <div className="flex items-start space-x-2">
        <span className="font-semibold text-gray-700 shrink-0">
          {index + 1}.
        </span>
        <Text
          as="p"
          className="font-medium text-lg text-gray-800 break-words line-clamp-3"
        >
          {message.content}
        </Text>
      </div>

      {/* Date under content */}
      <div className="text-sm text-gray-500 pl-6">
        {dayjs(message.createdAt).format("MMM D, YYYY • h:mm A")}
      </div>
    </div>
  </Card>
</Dialog.Trigger>

      {/* Detail dialog */}
      <Dialog.Content className="max-w-lg w-full rounded-xl p-6 bg-white shadow-lg animate-fade-in">
        <Dialog.Header>
          <Text as="h4" className="text-2xl font-bold text-gray-900">
            Message Details
          </Text>
        </Dialog.Header>

        <p className="mt-4 text-gray-700 whitespace-pre-line break-words">
          {message.content}
        </p>

        {message.status && (
          <span
            className={`inline-block mt-3 px-3 py-1 text-sm font-semibold rounded ${statusColors[message.status]}`}
          >
            {message.status.toUpperCase()}
          </span>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Sent on: {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={() => setIsDetailOpen(false)}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
            disabled={isDeleting}
          >
            <Trash className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
