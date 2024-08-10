import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type ChargeWebhook = {
  event: "charge.success";
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata: any;
    log: {
      time_spent: number;
      attempts: number;
      authentication: string;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      errors: any;
      success: boolean;
      mobile: boolean;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      input: any;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      channel: any;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      history: any;
    };

    }
    fees: number | null;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: null;
      risk_action: string;
    }
  }



export async function POST(req: Request) {
  const supabase = createClient();
  const reqHeaders = headers();
  const { createHmac } = await import("node:crypto");

  const body: ChargeWebhook = await req.json();



  console.log(body);


return NextResponse.json({
  status: "success",
  message: "Webhook received",
  data: body,
})


}
