"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your server
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  }

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Send us a message</h2>
          {isSubmitted ? (
            <div
              className="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded"
              role="alert"
            >
              <strong className="font-bold">Thank you for your message!</strong>
              <p className="block sm:inline">We'll get back to you soon.</p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="rounded-none" type="submit">Send Message</Button>
              </form>
            </Form>
          )}
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <p>
                9 Ferndale Road, Humewood, Port Elizabeth, 6001, South Africa
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <p>+27 65 944 6989</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <p>info@glambeads.co.za</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-2 text-xl font-semibold">Location</h3>
            <div className="flex items-center justify-center w-full h-64 bg-gray-300 rounded-lg">
              <p className="text-gray-600">Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
