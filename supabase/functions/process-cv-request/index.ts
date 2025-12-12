import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const handler = async (req: Request): Promise<Response> => {
  console.log("Process CV request function called");
  
  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action");

    console.log("Processing request:", { token, action });

    if (!token || !action) {
      return new Response(
        "<html><body><h1>Invalid Request</h1><p>Missing token or action parameter.</p></body></html>",
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    if (action !== "approve" && action !== "reject") {
      return new Response(
        "<html><body><h1>Invalid Action</h1><p>Action must be 'approve' or 'reject'.</p></body></html>",
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the CV request
    const { data: cvRequest, error: fetchError } = await supabase
      .from("cv_requests")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (fetchError || !cvRequest) {
      console.error("Error fetching CV request:", fetchError);
      return new Response(
        "<html><body><h1>Request Not Found</h1><p>This CV request was not found or has already been processed.</p></body></html>",
        { status: 404, headers: { "Content-Type": "text/html" } }
      );
    }

    if (cvRequest.status !== "pending") {
      return new Response(
        `<html><body><h1>Already Processed</h1><p>This request has already been ${cvRequest.status}.</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    // Update the request status
    const newStatus = action === "approve" ? "approved" : "rejected";
    const { error: updateError } = await supabase
      .from("cv_requests")
      .update({ status: newStatus, processed_at: new Date().toISOString() })
      .eq("token", token);

    if (updateError) {
      console.error("Error updating CV request:", updateError);
      throw updateError;
    }

    console.log("CV request status updated to:", newStatus);

    // Send email to the requester
    if (action === "approve") {
      await resend.emails.send({
        from: "Davor Mulalić <onboarding@resend.dev>",
        to: [cvRequest.email],
        subject: "CV Download Approved - Davor Mulalić",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
              ✓ Your Request Has Been Approved
            </h1>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Dear ${cvRequest.name || "Colleague"},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in my professional background. I am pleased to approve your request to download my CV.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://davor-mulalic-ai-portfolio.lovable.app/Davor_Mulalic_CV.pdf" 
                 style="display: inline-block; background: #16213e; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                📄 Download CV
              </a>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              If you have any questions or would like to discuss potential collaboration opportunities, please don't hesitate to reach out.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>Davor Mulalić</strong><br>
              CEO & Managing Director | AI Strategist
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">
                <a href="mailto:mulalic71@gmail.com" style="color: #16213e;">mulalic71@gmail.com</a> | 
                <a href="https://www.linkedin.com/in/davormulalic" style="color: #16213e;">LinkedIn</a>
              </p>
            </div>
          </div>
        `,
      });
      
      console.log("Approval email sent to requester:", cvRequest.email);

      return new Response(
        `<html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0fdf4; }
              .container { text-align: center; padding: 40px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 500px; }
              h1 { color: #16a34a; margin-bottom: 20px; }
              p { color: #666; line-height: 1.6; }
              .icon { font-size: 64px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">✅</div>
              <h1>Request Approved!</h1>
              <p>An email with the CV download link has been sent to <strong>${cvRequest.email}</strong>.</p>
              <p style="color: #999; font-size: 14px; margin-top: 20px;">You can close this window.</p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    } else {
      // Rejection email
      await resend.emails.send({
        from: "Davor Mulalić <onboarding@resend.dev>",
        to: [cvRequest.email],
        subject: "CV Download Request - Davor Mulalić",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              Request Update
            </h1>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Dear ${cvRequest.name || "Colleague"},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in my professional background. Unfortunately, I am unable to approve your CV download request at this time.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              If you believe this was a mistake or would like to discuss further, please feel free to contact me directly.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>Davor Mulalić</strong><br>
              CEO & Managing Director | AI Strategist
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">
                <a href="mailto:mulalic71@gmail.com" style="color: #16213e;">mulalic71@gmail.com</a> | 
                <a href="https://www.linkedin.com/in/davormulalic" style="color: #16213e;">LinkedIn</a>
              </p>
            </div>
          </div>
        `,
      });
      
      console.log("Rejection email sent to requester:", cvRequest.email);

      return new Response(
        `<html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fef2f2; }
              .container { text-align: center; padding: 40px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 500px; }
              h1 { color: #dc2626; margin-bottom: 20px; }
              p { color: #666; line-height: 1.6; }
              .icon { font-size: 64px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">❌</div>
              <h1>Request Rejected</h1>
              <p>An email has been sent to <strong>${cvRequest.email}</strong> informing them of your decision.</p>
              <p style="color: #999; font-size: 14px; margin-top: 20px;">You can close this window.</p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    }
  } catch (error: any) {
    console.error("Error in process-cv-request function:", error);
    return new Response(
      `<html><body><h1>Error</h1><p>${error.message}</p></body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
};

serve(handler);
