import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, message }: ContactEmailRequest = await req.json();

    console.log(`Processing contact form submission from ${firstName} ${lastName} (${email})`);

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["drkarm123@gmail.com"],
      reply_to: email,
      subject: `Portfolio Contact from ${firstName} ${lastName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #33CCCC;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content h4 {
      color: #182236;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin: 5px 0;
    }
    .message-box {
      background-color: #F6F7F9;
      padding: 15px;
      border-left: 4px solid #33CCCC;
      margin: 15px 0;
    }
    .footer {
      background-color: #f3f4f6;
      color: #6b7280;
      padding: 10px;
      text-align: center;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <h4>Contact Details</h4>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      
      <h4>Message</h4>
      <div class="message-box">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from your portfolio contact form</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
