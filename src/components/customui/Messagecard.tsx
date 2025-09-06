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
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const response = await axios.delete<ApiResponse>(`/api/deletemessage/${message._id}`);
            toast.success(response.data.message || "Message deleted successfully");
            onMessageDelete(message._id as string);
            setIsDialogOpen(false);
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
        <Card className="flex flex-col justify-between p-4 shadow-lg hover:shadow-xl transition-shadow rounded-lg">
            {/* Message Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-1">
                    <Text as="p" className="font-medium text-xl text-gray-800 break-words">
                        {message.content}
                    </Text>
                    {message.status && (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${statusColors[message.status]}`}
                        >
                            {message.status.toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Delete Button */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Dialog.Trigger asChild>
                        <Button
                            size="sm"
                            className="flex items-center justify-center p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                            aria-label="Delete message"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </Dialog.Trigger>

                    <Dialog.Content className="max-w-md w-full rounded-xl p-6 bg-white shadow-lg animate-fade-in">
                        <Dialog.Header>
                            <Text as="h5" className="text-xl font-semibold text-gray-900">
                                Confirm Deletion
                            </Text>
                        </Dialog.Header>

                        <p className="mt-4 text-gray-700 leading-relaxed">
                            Are you sure you want to delete this message? <span className="font-medium">This action cannot be undone.</span>
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleDeleteConfirm}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Confirm"}
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog>

            </div>

            {/* Footer / Timestamp */}
            <div className="text-sm text-gray-500 mt-auto">
                {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
            </div>
        </Card>
    );
}
