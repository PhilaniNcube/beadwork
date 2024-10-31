import { cache } from "react";
import { createClient } from "../supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();

  const {data:{user}} = await supabase.auth.getUser();

  return user;
})

export const getUserProfile = cache(async (id:string) => {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

    if(error) {
      console.error(error);
    }

  return data;
});


export async function getAdmin () {
  const supabase = await createClient();

  const {data, error} = await supabase.rpc("is_admin");
  if(error) {
    console.error(error);
    throw new Error("Error getting admin status");
  }

  return data;
}
