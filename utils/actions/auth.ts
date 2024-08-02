"use server";

import { loginSchema, signUpSchema } from "@/schema";
import { createClient } from "../supabase/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";



export async function loginAction (prevState:unknown, formData:FormData) {
  const supabase = createClient();

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if(!validatedFields.success) {
    return {errors: validatedFields.error.flatten().fieldErrors};
  }

    const {data,  error } = await supabase.auth.signInWithPassword({
					email: validatedFields.data.email,
					password: validatedFields.data.password,
				});

        revalidatePath("/login");

  if (error) {
    return {error: error.message};
  }

  return {data};

}


export async function signUpAction (prevState:unknown, formData:FormData) {
  const supabase = createClient();

  const origin = headers().get("origin");

  const validatedFields = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    last_name: formData.get("last_name"),
    first_name: formData.get("first_name"),
  })

  if(!validatedFields.success) {
    return {errors: validatedFields.error.flatten().fieldErrors};
  }

    const {data,  error } = await supabase.auth.signUp({
					email: validatedFields.data.email,
					password: validatedFields.data.password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
              last_name: validatedFields.data.last_name,
              first_name: validatedFields.data.first_name,
            }
          }
				});

  revalidatePath("/sign-up");

  if (error) {
    return {error: error.message};
  }

  if(data === null && error === undefined || error === null) {
    return { message: "Please check your email to verify your account" };
  }

  return {
    message: "Please check your email to verify your account",
  };


}
