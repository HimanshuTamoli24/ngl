'use client';

import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader2, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { Button } from '@/components/retroui/Button';
import { toast } from 'sonner';


export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.input<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<z.input<typeof messageSchema>> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post<ApiResponse>('/api/sendmessages', { ...data, username });
      form.reset({ content: '' });
      toast.success("Message sent Successfully")
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      setError(axiosError.response?.data.message || 'Failed to send message');
      toast.error(axiosError.response?.data.message || "Failed to send message, try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title={`Send Anonymous Text Message to @${username} - Askly`}
        description={`Send fun anonymous text messages to @${username} safely and securely on Askly! Share your thoughts, ask questions, or have entertaining conversations without revealing your identity.`}
        ogUrl={`https://www.asklyy.tech/u/${username}`}
      />
      <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl hover:shadow-xs border shadow-s p-8 flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 italic">
          Send Anonymous Message to
          <span className="text-blue-600">@{username}</span>
        </h1>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message..."
                      {...field}
                      className="resize-y min-h-[120px] px-4 py-3 border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    />
                  </FormControl>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    variant={"outline"}
                    type="submit"
                    disabled={isLoading || !field.value}
                    className="w-full flex justify-center items-center py-3 rounded-xl bg-blue-600  hover:text-white text-black font-medium transition-colors"
                  >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    <span className="ml-2">{isLoading ? 'Sending...' : 'Send'}</span>
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Separator className="my-4" />

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-700 mb-2">Want to receive anonymous messages?</p>
          <Link
            href="/signup"
            className="inline-block   text-black px-6 py-3 rounded-xl font-medium tansition-colors"
          >
            <Button className="bg-blue-600  hover:text-white text-black" variant={"outline"}>Create Your Profile</Button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
