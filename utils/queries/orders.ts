import "server-only";
import { createClient } from "../supabase/service";
import { Database } from "@/supabase";

export async function getOrders() {
  const supabase = createClient();

  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}


export async function getTotalOrders() {
  const supabase = createClient();

  const {  error, count } = await supabase.from("orders").select("id", { count: "exact", head: true });

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { count, status: 200 };
}

export async function getOrderById(id:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getOrdersByUserId(id:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("orders").select("*").eq("user_id", id);

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getOrdersByStatus(status:Database['public']['Enums']['status']) {
  const supabase = createClient();

  const { data, error, count  } = await supabase.from("orders").select("id, total_amount", {count: 'exact'}).eq("status", status);

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 , count};
}

export async function getOrdersByDate(date:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("orders").select("*").eq("created_at", date);

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getTotalOrderValue() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_total_order_value")

  if (error) {
    return { error: error.message, status: 400 };
  }

  if (!data) {
    return { error: "No data returned", status: 400 };
  }

  return {data, status: 200 };
}


export async function getOrderItemsByOrderId(id:number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("order_items").select("*").eq("order_id", id);

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}

export async function getOrderItemValues () {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_order_item_count_and_value')

  if (error) {
    return { error: error.message, status: 400 };
  }

  if (!data) {
    return { error: "No data returned", status: 400 };
  }

  return {data, status: 200 };
}


// get order by transaction_id
export async function getOrderByTransactionId(transaction_id:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("orders").select("*").eq("transaction_id", transaction_id).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  // fetch the order items
  const { data: order_items, error: order_items_error } = await supabase.from("order_items").select("*").eq("order_id", data?.id);


//  fetch the shipping address
  const { data: shipping_address, error: shipping_address_error } = await supabase.from("shipping_addresses").select("*").eq("id", data?.shipping_address_id).single();

  if (order_items_error || shipping_address_error) {
    return { error: "Error fetching order details", status: 400 };
  }

  return { data, status: 200, order_items, shipping_address };
}


export async function getShippingAddress (id:number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("shipping_addresses").select("*").eq("id", id).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}


export async function getOrderItems (orderId:string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("order_items").select("*").eq("order_id", orderId);

  // fetch the product name of each item in the order items


  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}


export const getProductName = async (productId:number) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("products").select("title, slug, id").eq("id", productId).single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}
