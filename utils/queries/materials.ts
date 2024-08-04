import { createClient } from "../supabase/server";

export async function getMaterials() {
  const supabase = createClient();
  const { data, error } = await supabase.from("materials").select("*");
  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}


export async function getMaterialById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("materials").select("*").eq("id", id).single();
  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getMaterialByName(name: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("materials").select("*").eq("name", name).single();
  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getProductMaterialsByProductId(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_materials").select("*").eq("product_id", id);
  if (error) {
    return [];
  }

  return data;
}
