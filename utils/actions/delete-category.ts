"use server";

import { revalidatePath } from "next/cache";
import { getAdmin } from "../queries/users";
import { createClient } from "../supabase/server";

export async function deleteCategory(id: number) {
  const supabase = createClient();

  const admin = getAdmin();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/categories", "layout");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/", "layout");
  return data;
}
