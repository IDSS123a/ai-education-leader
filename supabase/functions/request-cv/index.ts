import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CVRequestBody {
  email: string;
  name?: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize string input
function sanitizeString(input: string | undefined | null, maxLength: number): string {
  if (!input) return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ""); // Remove potential HTML tags
}

const handler = async (req: Request): Promise<Response> => {
  console.log("CV request function called");
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Sanitize and validate inputs
    const email = sanitizeString(body.email, 255)?.toLowerCase();
    const name = sanitizeString(body.name, 100) || null;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Processing CV request for email (hashed):", email.substring(0, 3) + "***");

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit (5 requests per 15 minutes per email)
    const { data: rateLimitOk, error: rateLimitError } = await supabase
      .rpc("check_rate_limit", {
        p_identifier: email,
        p_action_type: "cv_request",
        p_max_attempts: 5,
        p_window_minutes: 15,
        p_block_minutes: 60,
      });

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (rateLimitOk === false) {
      console.log("Rate limit exceeded for:", email.substring(0, 3) + "***");
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if email already has a pending or approved request
    const { data: existingRequest } = await supabase
      .from("cv_requests")
      .select("id, status")
      .eq("email", email)
      .in("status", ["pending", "approved"])
      .limit(1)
      .maybeSingle();

    if (existingRequest) {
      const message = existingRequest.status === "approved" 
        ? "Your request is already approved. Check your status at /cv-status"
        : "You already have a pending request. Please wait for review.";
      
      return new Response(
        JSON.stringify({ success: true, message, alreadyExists: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

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

    console.log("CV request created successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Request submitted successfully", token: cvRequest.token }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in request-cv function:", error.message);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
