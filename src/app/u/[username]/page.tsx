'use client';

import React, { useState } from 'react';
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


export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
      createdAt: new Date(),
    },
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<z.infer<typeof messageSchema>> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post<ApiResponse>('/api/sendmessages', { ...data, username });
      form.reset({ content: '', createdAt: new Date() });
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      setError(axiosError.response?.data.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-xl shadow-lg max-w-4xl">
      {/* Header */}
      <h1 className="text-4xl text-center font-bold mb-8 italic text-gray-800">
        Send Anonymous Message to @{username}
      </h1>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl className="flex-1">
                  <Textarea
                    placeholder="Write your anonymous message here..."
                    className="resize-none h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="h-12 flex items-center justify-center px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {isLoading && <Loader2 className="text-center w-fit animate-spin  m-auto" />}
                  <Send className={`${isLoading ? 'hidden' : 'visible'}`} />
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
            
<div style={{ width: '100%', height: '600px', position: 'relative' }}>

</div>
      <Separator className="my-6" />

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-700 mb-2">
          Want to receive anonymous messages?
        </p>
        <Link href="/signup" className="text-blue-600 hover:underline font-medium">
          Create your profile now!
        </Link>
      </div>
    </div>
  );
}
