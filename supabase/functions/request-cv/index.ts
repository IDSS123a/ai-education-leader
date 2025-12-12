import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CVRequestBody {
  email: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("CV request function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { email, name }: CVRequestBody = await req.json();
    console.log("Received CV request from:", email);

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert CV request
    const { data: cvRequest, error: insertError } = await supabase
      .from("cv_requests")
      .insert({ email, name })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting CV request:", insertError);
      throw insertError;
    }

    console.log("CV request created:", cvRequest.id);

    // Get base URL for approval links
    const baseUrl = Deno.env.get("SUPABASE_URL")!.replace(".supabase.co", ".functions.supabase.co");

    // Send email to Davor for approval
    const approveUrl = `${baseUrl}/process-cv-request?token=${cvRequest.token}&action=approve`;
    const rejectUrl = `${baseUrl}/process-cv-request?token=${cvRequest.token}&action=reject`;

    const emailResponse = await resend.emails.send({
      from: "CV Request <onboarding@resend.dev>",
      to: ["mulalic71@gmail.com"],
      subject: `CV Download Request from ${name || email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a2e; border-bottom: 2px solid #16213e; padding-bottom: 10px;">
            New CV Download Request
          </h1>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name || "Not provided"}</p>
            <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <p style="color: #666; margin-bottom: 30px;">
            This person is requesting access to download your CV. Please choose an action:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${approveUrl}" 
               style="display: inline-block; background: #16a34a; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
              ✓ Approve
            </a>
            <a href="${rejectUrl}" 
               style="display: inline-block; background: #dc2626; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
              ✗ Reject
            </a>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
            Request ID: ${cvRequest.id}<br>
            Requested at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    console.log("Approval email sent to Davor:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Request submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in request-cv function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
