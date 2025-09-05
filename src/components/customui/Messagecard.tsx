"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import {  Trash } from "lucide-react";
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

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(
                `/api/deletemessage/${message._id}`
            );
            toast.success(response.data.message || "Message deleted successfully");
            onMessageDelete(message._id as string);

            // Close the dialog after deletion
            setIsDialogOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ApiResponse>;
                toast.error(
                    axiosError.response?.data.message || "Failed to delete message"
                );
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <Card>
            <Card.Header className="relative p-4">
                <Card.Description className="pr-24 font-semibold">{message.content}</Card.Description>

                <div className="absolute top-4 right-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <Dialog.Trigger asChild>
                            <Button className="flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                <Trash className="h-4 w-4 mr-1" />
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Content className="max-w-sm rounded-lg p-6">
                            <Dialog.Header>
                                <Text as="h5" className="font-semibold text-lg">
                                    Confirm your action
                                </Text>
                            </Dialog.Header>

                            <div className="mt-4 space-y-3 text-gray-700">
                                <p>Are you sure you want to delete this item?</p>
                                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <Button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteConfirm}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Confirm
                                </Button>
                            </div>
                        </Dialog.Content>
                    </Dialog>
                </div>
            </Card.Header>

            <Card.Content className="text-sm text-gray-500">
                {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
            </Card.Content>
        </Card>
    );
}
