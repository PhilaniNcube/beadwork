import { createClient } from "../supabase/server";

export async function getProductSizes(productId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("sizes")
    .select("*")
    .eq("product_id", productId);

  if (error || !data || data.length === 0) {
    return [];
  }

  return data;
}
