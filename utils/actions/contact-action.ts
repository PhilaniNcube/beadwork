"use server";

import { Resend } from "resend";
import "server-only";
// initialise resend
const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendContactForm(prevState: unknown, formData:FormData) {

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;


  if(!email || !name || !message) {
    return { status: 400, message: "Please fill out all fields" };
  }

  // send email with Resend
  try {

    const {data, error} = await resend.emails.send({
      from: "info@glambeads.co.za",
      to: ['info@glambeads.co.za'],
      subject: "New contact form submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    })

    if(error) {
      console.log(error);
      throw new Error(error.message);
    }

    return { status: 200, message: "Form sent successfully" };

  } catch (error) {

    return { status: 400, message: "An error occurred while sending the form" };

  }



}
