"use client";

import { startTransition, useActionState, useState } from "react";
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
import { sendContactForm } from "@/utils/actions/contact-action";
import { start } from "repl";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(4, {
    message: "Message must be at least 4 characters.",
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

  const [state, formAction, isPending] = useActionState(sendContactForm, null);

  function onSubmit(values: z.infer<typeof formSchema>)  {

    const fomrData = new FormData();
    fomrData.append("name", values.name);
    fomrData.append("email", values.email);
    fomrData.append("message", values.message);

    startTransition(() => formAction(fomrData));



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
                <Button disabled={isPending} className="rounded-none" type="submit">Send Message</Button>
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

        </div>
      </div>
    </div>
  );
}
