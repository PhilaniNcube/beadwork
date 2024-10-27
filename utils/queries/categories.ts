import { createClient } from "../supabase/server";

export async function getCategories() {
  const supabase = createClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getCategoryBySlug(slug:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getCategoryById(id:number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}


export async function getProductCategoriesByProductId(id:number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("product_categories").select("*").eq("product_id", id);

  if (error) {
    return [];
  }

  return data;
}


export async function getChildCategories() {
  const supabase = createClient();

  const { data, error } = await supabase.from("categories").select("*").not("parent_category_id", "is", null);

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}
