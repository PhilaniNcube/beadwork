import { cache } from "react";
import { createClient } from "../supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = createClient();

  const {data:{user}} = await supabase.auth.getUser();

  return user;
})

export const getUserProfile = cache(async (id:string) => {
  const supabase = createClient();

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


